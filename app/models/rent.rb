class Rent < ActiveRecord::Base
  attr_accessor :pattern
      #TODO validations!

  establish_connection :rents

  belongs_to :user
  has_many :rentphotos
  
  has_many :rentfavorites, :dependent => :destroy
  has_many :users, :through => :rentfavorites
  #before_create :enrich

  attr_accessor :img_amount, :user_fav_in

  after_initialize :img_length, :user_fav_in

  def as_json(option = {})
    super.merge(:img_amount => img_amount)
  end

  def enrich; img_length; end

  def Rent.get_rents(page, dist_code=nil, rooms=nil, search_string=nil, min_rent=nil, max_rent=nil, sort=nil)

    Rails.logger.debug "MIN, MAX: #{min_rent}, #{max_rent}" 

    max_rent = max_rent.nil? || max_rent.empty?? 1000000000 : max_rent #subselect or hardcoded, hm...
    min_rent = min_rent.nil? || min_rent.empty?? 0 : min_rent
    logger.debug("Rent#get_rents:    " + dist_code.to_s + "  " + rooms.to_s + "  " + page.to_s)

    prepared_statement = where(
                "dist_code LIKE ? #{rooms.nil? || rooms.empty? ? '' : "AND rooms IN (#{rooms})"} 
                AND (price BETWEEN ? AND ?)  AND (adress LIKE ? or info LIKE ?)",
                "%#{dist_code}%", 
                min_rent, 
                max_rent,
                "%#{search_string}%", 
                "%#{search_string}%"               
              ).order('updated_at DESC')#.order('price')
    result_rents =  prepared_statement.offset((page.to_i*10)-10).limit(10).all
    condition_amount = prepared_statement.count
    return result_rents, condition_amount
  end

  def user_fav_in
    @user_fav_in = users.map { |i| i.id }
  end


  

  private

  def img_length
    amount = (self.id).nil? ? 0 :(Rentphoto.count_by_sql "SELECT COUNT(*) from rentphotos where rent_id = #{self.id}")
    self.img_amount = amount > 0 ? amount : 0
  end


  

end

