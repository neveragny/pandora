class EstateController < ApplicationController

  skip_before_filter :existent_user

  def index
    if params[:id] == "index"
      redirect_to "/"
    end
   
    @rents, @amnt = Rent.get_rents(0, 0, "", 1)
    respond_to do |format|
      format.html
      format.json { render :json => @rents }
      format.js {render :content_type => 'text/javascript', :layout => false}
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
      #format.html
      format.js { render :content_type => 'text/javascript' }
    end
  end

  def add_to_bookmarks
    bookmark = Rentbookmark.new(:user_id => @current_user,:rent_id => params[:rent_id])
    
    respond_to do |format|
      if bookmark.save
        format.json {render :json => {:result => "ADDED"}}
      else
        format.json {render :json => {:result => "NOT OK"}}
      end
    end
  end

  def remove_from_bookmarks
    bookmark_id = Rentbookmark.where("user_id = ? and rent_id = ?", @current_user, params[:rent_id]).first.id

    respond_to do |format|
      if Rentbookmark.destroy(bookmark_id)
        format.json {render :json => {:result => "REMOVED"}}
      else
        format.json {render :json => {:result => "NOT OK"}}
      end
    end
  end

  def all_bookmarks
    @bookmarks = Rentbookmark.get_all @current_user
      respond_to do |format|
        format.json {render :json => @bookmarks, :layout => false, :status => 200 if @current_user }
      end
  end

end
