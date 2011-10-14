class Rentfavorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :rent

  validates_uniqueness_of :rent_id
end
