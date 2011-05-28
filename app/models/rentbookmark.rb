class Rentbookmark < ActiveRecord::Base
  validates_uniqueness_of :rent_id, :scope => :user_id

  def Rentbookmark.get_all(user_id)
    #TODO return string of all rent_ids for @current_user
    bookmarks = []
    Rentbookmark.select("rent_id").where("user_id = ?" , user_id).to_a.each{ |bookmark| bookmarks << bookmark.rent_id }
    return bookmarks.join(",")
  end
end
