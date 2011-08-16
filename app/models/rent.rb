class Rent < ActiveRecord::Base
  attr_accessor :pattern
      #TODO validations!

  establish_connection :rents

  belongs_to :user
  has_many :rentphotos
  #before_create :enrich

  attr_accessor :img_amount

  after_initialize :img_length

  def as_json(option = {})
    super.merge(:img_amount => img_amount)
  end

  def enrich; img_length; end

  def Rent.get_rents(page, dist_code=nil, rooms=nil, search_string=nil)
    logger.debug("Rent#get_rents:    " + dist_code.to_s + "  " + rooms.to_s + "  " + page.to_s)
    prepared_statement = where("dist_code  like ? and rooms like ? and (adress like ? or info like ?)", "%#{dist_code}%", "%#{rooms}%", "%#{search_string}%", "%#{search_string}%")
    result_rents =  prepared_statement.offset((page.to_i*20)-20).limit(20).order("date DESC").all
    condition_amount = prepared_statement.count
    return result_rents, condition_amount
    end


  private

  def img_length
    amount = (self.id).nil? ? 0 :(Rentphoto.count_by_sql "SELECT COUNT(*) from rentphotos where rent_id = #{self.id}")
    self.img_amount = amount > 0 ? amount : 0
  end

end

