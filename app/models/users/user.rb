class NotRestrictedValidator < ActiveModel::EachValidator
  # You can`t register with restricted login!!!
  def validate_each(record, attribute, value)
    record.errors[attribute] << ": Using #{attribute} '#{value}' is forbidden, sorry" unless
        !User::RESTRICTED_LOGINS.index(value) #.find {|login| value =~ /#{login}/}
  end
end

class User < ActiveRecord::Base

  validates :email, :presence => true, :uniqueness => true, :length => {:maximum => 25, :minimum => 5}
  validates :login, :presence => true, :uniqueness => true, :length => {:maximum => 15, :minimum => 3}, :not_restricted => true

  delegate :first_name, :first_name=, :last_name, :last_name=, :city, :city=, :country, :country=,
    :avatar, :avatar=, :phone, :phone=, :age, :to => :user_details

  has_one :user_details # e.g -> Name, gender etc

  before_save :change_entries_sex
  after_create :create_details

  acts_as_authentic { |config| config.login_field :login }

  # Array of restricted logins
  RESTRICTED_LOGINS = %w(main login user admin administrator main index users photos attachments attachment
    photo user_session user_sessions logout register registration)


  def gender
    self.sex == 0 ? 'female' : 'male'
  end

  # Alias to relation
  def details
    self.user_details
  end

  def create_details
    self.create_user_details
  end

  private

  def create_details
    self.create_user_details
  end

  # To reduce the amount of db requests, 'sex' is also stored in all comments user creates
  # So if user changes his sex we must change all his comments 
  def change_entries_sex
    if self.sex_changed?
      RootEntry.where(:user_id => self.id).each do |entry|
        entry.author_sex = self.sex
        entry.save
      end
    end
  end

end
