class RentallController < ApplicationController

  skip_before_filter :existent_user

  def show
    @body_id = "listingDetail"
    @rentall = Rent.find(params[:id])
  end

  def new
  end

  def create
  end

  def destroy
  end

end
