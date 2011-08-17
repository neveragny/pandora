class RenterController < ApplicationController

  skip_before_filter :existent_user
#  before_filter :validate_request, :only => :create

  ITEMS_PER_PAGE = 20

  def index

  end

  def search
    @estate = Rent.new
    @page =  1
    @rents, amount = Rent.get_rents(@page )
    @pages = amount.to_i ? amount.to_i+1 : amount.to_i
    @last_page = amount/ITEMS_PER_PAGE + 1
  end

end
