class Photo < ActiveRecord::Base
  establish_connection :countries
  belongs_to :rent

  has_attached_file :photo,
      :styles => {
          :thumb => "100x100",
          :small => "150x150"
      },
      :storage => :s3,
      :s3_credentials => "#{Rails.root}/config/s3.yml",
      :path => ":attachment/:id/:style.:extension",
      :url => ':s3_domain_url'
  #attr_accessor :photo_file_name, :photo_content_type, :photo_size

end















#You HAVE TO EXPLICITLY specify <your_bucket_here>.amazonws.com
