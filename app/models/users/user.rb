class NotRestrictedValidator < ActiveModel::EachValidator
  # You can`t register with restricted login!!!
  def validate_each(record, attribute, value)
    record.errors[attribute] << ": Using #{attribute} '#{value}' is forbidden, sorry" unless
        !User::RESTRICTED_LOGINS.index(value) #.find {|login| value =~ /#{login}/}
  end
end

class User < ActiveRecord::Base

  def to_param
    login.parameterize
  end

  attr_accessible :login, :email, :sex, :password, :password_confirmation, :avatar, :crop_x, :crop_y, :crop_w, :crop_h
  attr_accessor :crop_x, :crop_y, :crop_h, :crop_w

  # AVATAR section
  has_attached_file :avatar,
                    #:path => Settings.services.assets.path,
                    #:url => Settings.services.assets.url,
                    :default_style => :thumb,
                    #:default_url =>
                    #    Settings.services.assets.defaults_path,
                    #:whiny_thumbnails => true,
                    :styles => {
                        :thumb => {:geometry => "110x110>", :format => :jpg, :processors => [:cropper]},
                        :small => {:geometry => "200x200>", :format => :jpg, :processors => [:cropper]},
                        :large => ['600x600>', :jpg]
                    }
  after_post_process :save_avatar_dimensions

  validates_attachment_content_type :avatar, :content_type => ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
                                    :unless => Proc.new  { |model| model.avatar }
  validates_attachment_size :avatar, :less_than => 1.megabytes, :unless => Proc.new { |model| model.avatar }

  before_save :randomize_file_name, :if => :uploading_avatar?
  after_update :reprocess_avatar, :if => :cropping?

  validate :avatar_geometry

  scope :wtf, proc {|user| select('login, ')}

  # AVATAR section END

  validates :email, :presence => true, :uniqueness => true, :length => {:maximum => 25, :minimum => 5}
  validates :login, :presence => true, :uniqueness => true, :length => {:maximum => 15, :minimum => 3}, :not_restricted => true

  delegate :first_name, :first_name=, :last_name, :last_name=, :city, :city=, :country, :country=,
           :phone, :phone=, :birth_date, :birth_date=, :website, :website=, :age, :to => :user_details

  has_one :user_details # e.g -> Name, gender etc

  # Pseudo many-to-many friendship relationship with joining table
  has_many :friendships
  has_many :inverse_friendships, :class_name => 'Friendship', :foreign_key => :friend_id

  has_many :messages
  has_many :incoming_messages, :class_name => 'Message', :foreign_key => :receiver_id

  # Make one db request instead of two ( for both direct and inverse friendships )
  # you must show it some love even though it's ugly
  scope :friends_of, proc {|user|
    joins("inner join (select f.user_id, f.friend_id from friendships f
              where ((f.user_id = #{user.id}) or (f.friend_id = #{user.id}))
              AND f.approved = 't' AND f.canceled = 'f') f
          on users.id = f.friend_id or users.id = f.user_id
          where users.id != #{user.id}") }

  scope :pending_friends_of, proc {|user|
    joins(:friendships).where(['friendships.friend_id = ?', user.id]).where(['approved = ?', false]).
        where(['canceled = ?', false])
  }

  scope :blacklisted, proc {|user| joins('inner join friendships on users.id = friendships.user_id').
      where(['friendships.friend_id = ?', user.id]).where(['friendships.canceled = ?', true])}

  after_create :create_details

  acts_as_authentic { |config| config.login_field :login }

  # Array of restricted logins
  RESTRICTED_LOGINS = %w(main login user admin administrator index users photos attachments attachment
    photo user_session user_sessions logout register registration)

  # Friendships

  def friendship_with(user, options = {:approved => true})
    friendship = Friendship.where(['(user_id = ? AND friend_id = ?) OR (friend_id = ? AND user_id = ?)',
                                   self.id, user.id, self.id, user.id]) #.where(['canceled = ?', false])
    friendship = friendship.where(['approved = ?', options[:approved]]) if options[:approved] != :all
    friendship
  end

  def gender
    self.sex == 0 ? 'female' : 'male'
  end

  # Alias to relation
  def details
    self.user_details
  end

  def cropping?
    ![crop_x, crop_y, crop_w, crop_h].find {|a| !a.is_a? Fixnum }.nil?
  end


  private

  def create_details
    self.create_user_details
  end

  def uploading_avatar?
    avatar_file_name_changed?
  end

  def randomize_file_name
    extension = File.extname(avatar_file_name).downcase
    self.avatar.instance_write(:file_name, "#{ActiveSupport::SecureRandom.hex(16)}#{extension}")
  end

  def reprocess_avatar
    avatar.reprocess!
  end

  def save_avatar_dimensions # See lib/attachment.rb for details
    if avatar.geometry.width > 100 && avatar.geometry.height > 100
      self.avatar_dimensions = {:original => {:width => avatar.geometry.width, :height => avatar.geometry.height},
                                :large => {:width => avatar.geometry(:large).width, :height => avatar.geometry(:large).height}}.to_s
    end
  end

  def avatar_geometry
    if self.avatar_file_name_changed?
      self.errors.add(:avatar,
                      'is too small( should be at least 100x100 px image)') if (avatar.geometry.height < 100 || avatar.geometry.width < 100)
    end
  end


end
