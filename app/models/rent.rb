class Rent < ActiveRecord::Base
  establish_connection :rents
  has_many :rentphotos
  attr_accessor :img_amount

  after_initialize :img_length

  def as_json(option = {})
    super.merge(:img_amount => img_amount)
  end

  def self.get_pages(dist_code, rooms, search_string)
    logger.info("GET_PAGES: dist_code = #{dist_code}, rooms = #{rooms}, string = #{search_string}")
    if dist_code == 0 && rooms == 0
      lengf = (count(:all,
                     :conditions => ["(adress like ? or info like ?)", "%#{search_string}%", "%#{search_string}%"])
              )/20.to_f
      #lengf > lengf.to_i ? lengf.to_i+1 : lengf.to_i
    elsif dist_code == 0 && rooms != 0
      lengf = (count(:all,
                     :conditions => ["rooms=? and (adress like ? or info like ?)", rooms, "%#{search_string}%", "%#{search_string}%"])
              )/20.to_f
    elsif rooms == 0 && dist_code != 0
      lengf = (count(:all,
                     :conditions => ["dist_code=? and (adress like ? or info like ?)", dist_code, "%#{search_string}%", "%#{search_string}%"])
              )/20.to_f
    else
      lengf = (count(:all,
                     :conditions => ["rooms=? and dist_code=? and (adress like ? or info like ?)",
                       rooms, dist_code, "%#{search_string}%","%#{search_string}%" ])
              )/20.to_f
    end
      lengf > lengf.to_i ? lengf.to_i+1 : lengf.to_i

  end

  def self.get_rents(dist_code, rooms, search_string, page)
    logger.debug("Rent#get_rents:    " + dist_code.to_s + "  " + rooms.to_s + "  " + page.to_s)
    if dist_code == 0 && rooms == 0
      finded = find(:all,
           :conditions => ["(adress like ? or info like ?)", "%#{search_string}%", "%#{search_string}%"],
           :offset => ((page*20)-20), :limit => 20, :order => "date DESC")
      amnt = count(:all, :conditions => ["(adress like ? or info like ?)", "%#{search_string}%", "%#{search_string}%"])
    elsif dist_code == 0 && rooms != 0
      finded = find(:all,
           :conditions => ["rooms=? and (adress like ? or info like ?)", rooms, "%#{search_string}%", "%#{search_string}%"],
           :offset => 0,
           :limit => 20,
           :order => "date DESC" )
      amnt = count(:all, :conditions => ["rooms=? and (adress like ? or info like ?)", rooms, "%#{search_string}%", "%#{search_string}%"])
    elsif rooms == 0 && dist_code != 0
      finded = find(:all,
           :conditions => ["dist_code=? and (adress like ? or info like ?)", dist_code, "%#{search_string}%", "%#{search_string}%"],
           :offset => 0,
           :limit => 20,
           :order => "date DESC" )
      amnt = count(:all, :conditions => ["dist_code=? and (adress like ? or info like ?)", dist_code, "%#{search_string}%", "%#{search_string}%"])
    else
      finded = find(:all,
           :conditions => ["dist_code =? and rooms=? and (adress like ? or info like ?)", dist_code, rooms, "%#{search_string}%", "%#{search_string}%" ],
           :offset => ((page.to_i*20)-20),
           :limit => 20,
           :order => "date DESC" )
      amnt = count(:all, :conditions => ["dist_code =? and rooms=? and (adress like ? or info like ?)", dist_code, rooms, "%#{search_string}%", "%#{search_string}%" ])
    end
    return finded, amnt
  end

  private

  def img_length
#    self.img_amount = self.photos ? self.photos.length : 0
    amount = Rentphoto.count_by_sql "SELECT COUNT(*) from photos where rent_id = #{self.id}"
    self.img_amount = amount > 0 ? amount : 0

  end

end
