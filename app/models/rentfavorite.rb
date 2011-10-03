class Rentfavorite < ActiveRecord::Base
  belongs_to :user

  validates_uniqueness_of :rent_id
end
