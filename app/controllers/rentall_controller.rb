class RentallController < ApplicationController

  skip_before_filter :existent_user


  def show
    @body_id = "listingDetail"
    if @current_user && User.find(@current_user).rentfavorites.where(:rent_id => params[:id]).any?
      @favorited = true
    else
      @favorited = false
    end
    Rails.logger.debug "current user: #{@current_user}, favorited #{@favorited}"
    @rentall = Rent.find(params[:id])
  end

  def new
  end

  def create
  end

  def destroy
  end

end
