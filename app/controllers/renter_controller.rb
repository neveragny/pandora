class RenterController < ApplicationController

  skip_before_filter :existent_user
  before_filter :enrich_class
  before_filter :require_user, :only => [:add_favorite, :delete_favorite, :favorites]
#  before_filter :validate_request, :only => :create

  ITEMS_PER_PAGE = 10

  def dashboard
    @body_id = 'home'
    @fav_rents = Rent.find(User.find(@current_user).rentfavorites.map{ |fav| fav.rent_id})
  end

  def listings
#    @renter = Rent.new
    @page =  1 
    @sort = 'updated_at'
    @rents, @amount = Rent.get_rents(@page, params )
    @pages = @amount.to_i ? @amount.to_i+1 : @amount.to_i
    @last_page = @amount/ITEMS_PER_PAGE + 1
    @fav = @current_user.rentfavorites.map{ |i| i.rent_id } if @current_user && @current_user.rentfavorites
    render :action => 'index'
  end

  def search
    @page = params[:page].to_i
    @sort = params[:sort]
    @rents, @amount = Rent.get_rents(@page, params)
    @pages = @amount.to_i ? amount.to_i+1 : amount.to_i
    @last_page = @amount/ITEMS_PER_PAGE + 1
    respond_to do|f|
      f.js {render :layout => false}
    end
    Rails.logger.debug "search goes Here!"
  end

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
    @body_id = 'favorites'
    @page =  1
    @rents = Rent.find(User.find(@current_user).rentfavorites.map{ |fav| fav.rent_id})
    amount = @rents.size
    @pages = amount.to_i ? amount.to_i+1 : amount.to_i
    @last_page = amount/ITEMS_PER_PAGE + 1
  end

  private
  def enrich_class
    @class = params[:action]
  end


end
