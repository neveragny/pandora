class RenterController < ApplicationController

  skip_before_filter :existent_user
  before_filter :enrich_class
  before_filter :require_user, :only => [:add_favorite, :delete_favorite, :favorites]
#  before_filter :validate_request, :only => :create

  ITEMS_PER_PAGE = 10

  def dashboard
    @body_id = 'home'
    #rent_ids = User.find(@current_user).rentfavorites
    @fav_rents = Rent.find(User.find(@current_user).rentfavorites.map{ |fav| fav.rent_id})
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
    @rents, amount = Rent.get_rents(@page, params[:dist_code], params[:rooms], params[:pattern], params[:min_rent], params[:max_rent])
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

  #Parameters
  #  rentId
  def add_favorite
    rentfavorite = User.find(@current_user).rentfavorites.build(:rent_id => params[:id])
    respond_to do |f|
      if rentfavorite.save
        f.json { render :json => {:success => :true}}
      else
        f.json { render :json => {:success => :false}}
      end
    end
  end

  def delete_favorite
    rentfavorite = User.find(@current_user).rentfavorites.where(:rent_id => params[:id]).first
    respond_to do |f|
      if rentfavorite.destroy
        f.json { render :json => {:success => :true}}
      else
        f.json { render :json => {:success => :false}}
      end
    end
  end

  def favorites

  end

  private
  def enrich_class
    @class = params[:action]
  end


end
