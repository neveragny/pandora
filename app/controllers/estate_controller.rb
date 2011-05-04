class EstateController < ApplicationController

  skip_before_filter :existent_user

  def index
    if params[:id] == "index"
      redirect_to "/"
    end
#    @rents = Rent.all
    respond_to do |format|
      format.html
      format.json { render :json => @rents }
    end
  end

  def show
    #check if guys comming to old comilffo from google :D
    redirect_to :action => :index if params[:id] == "index"
    @rent = Rent.where(:id => params[:id]).first
  end

#  If user select "все" in rooms amount at UI , params[:rooms] will be = 0
#  For dist_code the same , if all district selected, 0 value passed to controller
#  Logic handles by Rent model
#
  def result
    dist_code = params[:dist_code].to_i
    rooms = params[:rooms].to_i
    page = params[:page].to_i
    search_string = params[:string]
    @rents, @amnt = Rent.get_rents(dist_code, rooms,search_string, page)
    @pages = Rent.get_pages(dist_code, rooms,search_string)

    respond_to do |format|
      format.html
      format.json { render :json => {:rents => @rents, :pages => @pages, :amount => @amnt} }
    end
  end

  def add_to_bookmarks
    bookmark = Bookmark.new(:ref_id => params[:rent_id])
    bookmark.type = "rent"  #THIS IMPORTANT!
    
    respont_to do |format|
      if bookmark.save
        format.json {render :json => {:result => "OK"}}
      else
        format.json {render :json => {:result => "NOT OK"}}
      end
    end

  end

end
