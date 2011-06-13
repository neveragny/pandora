class EstateController < ApplicationController

  autocomplete :street, :rus_name
  skip_before_filter :existent_user

  def index
    logger.warn "PARAMS : #{params}"

    @filter = params[:filter]
    logger.debug("FILTER: #{@filter}")
    @page = params[:page].blank? ? 1 : params[:page].to_i



    if !@filter
      @rents, @amnt = Rent.get_rents(0, 0, "", (!@page? 1: @page) )
      @pages = Rent.get_pages(0, 0, "")
    else
      dist_code= @filter[:dist_code].blank? ? 0 : @filter[:dist_code]
      rooms= @filter[:rooms].blank? ? 0 : @filter[:rooms].to_i
      search_query= @filter[:search_query]
      @rents, @amnt = Rent.get_rents(dist_code, rooms, search_query, @page )  #dist_code ,rooms ,string ,page
      @pages = Rent.get_pages(dist_code, rooms, search_query) # dist_code, rooms, search_string
      @pagified_filter = filter_to_string(@filter)
      logger.debug("filter_to_string: #{filter_to_string(@filter)}")
      logger.debug("ROOMS: #{@filter[:rooms]}")
      logger.debug("PAGES: #{@pages}")
      logger.debug("PAGE: #{@page}")
    end

    respond_to do |format|
      format.html
#      format.json { render :json => @rents }
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
    bookmark = Rentbookmark.new(:user_id => @current_user.id,:rent_id => params[:rent_id])
    
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
    @bookmarks = Rentbookmark.get_all @current_user.id
      respond_to do |format|
        format.json {render :json => @bookmarks, :layout => false, :status => 200 if @current_user }
      end
  end

  def favorites
    if @current_user
      @fav_rents = Rent.where("id in (?)", Rentbookmark.get_all(@current_user.id).split(','))
      logger.warn @fav_rents
    else
     
      favorites = cookies[:favorite_estates]
      
      @fav_rents = favorites ? Rent.where("id in (?)", favorites.split(',')) : []
    end
  end

  def new
    if @current_user
      @rent = Rent.new
    end
  end

  def create
    @user = current_user
    @rent = current_user.rents.build( params[:rent] )
    if @rent.save
      format.html { redirect_to "/"}
    else
      format.json {
          render :json => { :errors => @album.errors.values.map(&:first),
                            :html_class => 'alert' },
                 :status => :unprocessable_entity
        }
    end
  end
  
  private
  def filter_to_string(filter)
    if !filter[:dist_code].blank? || !filter[:rooms].blank? || !filter[:search_query].blank?
      return "&filter[dist_code]=#{filter[:dist_code]}&filter[rooms]=#{filter[:rooms]}&filter[search_query]=#{filter[:search_query]}"
    end
  end


end



