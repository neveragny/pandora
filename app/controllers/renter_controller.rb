class RenterController < ApplicationController

  skip_before_filter :existent_user
#  before_filter :validate_request, :only => :create

  ITEMS_PER_PAGE = 10

  def index

  end

  def listings
#    @renter = Rent.new
    @page =  1
    @rents, amount = Rent.get_rents(@page )
    @pages = amount.to_i ? amount.to_i+1 : amount.to_i
    @last_page = amount/ITEMS_PER_PAGE + 1
    render :action => 'index'
  end


  #Parameters: {
  #   "utf8"=>"✓",
  #   "authenticity_token"=>"bEphDxK7o5kIilwarnAjwJew2g4l29tebstwxrf8G7U=",
  #   "broker_id"=>"",
  #   "dist_code"=>"0",
  #   "aids"=>"0",
  #   "min_rent"=>"",
  #   "max_rent"=>"", "
  #   "move_date"=>"",
  #   "amids"=>"0",
  #   "pets"=>""
  # }
  def search
    @page = params[:page].to_i
    @rents, amount = Rent.get_rents(@page, params[:dist_code], params[:rooms], params[:pattern])
    @pages = amount.to_i ? amount.to_i+1 : amount.to_i
    @last_page = amount/ITEMS_PER_PAGE + 1
    Rails.logger.debug ">>>>>>>>>> amount:    #{amount}"
    Rails.logger.debug ">>>>>>>>>> @last_page:    #{@last_page}"
    Rails.logger.debug ">>>>>>>>>> @page:    #{@page}"

    respond_to do|f|
      f.js {render :layout => false}
    end
    Rails.logger.debug "search goes Here!"
  end

end
