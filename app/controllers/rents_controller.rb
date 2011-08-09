class RentsController < ApplicationController

  autocomplete :street, :rus_name
  skip_before_filter :existent_user
  before_filter :validate_request, :only => :create

  ITEMS_PER_PAGE = 20

  def index
    @estate = Rent.new
    @page =  1
    @rents, amount = Rent.get_rents(@page )
    @pages = amount.to_i ? amount.to_i+1 : amount.to_i
    @last_page = amount/ITEMS_PER_PAGE + 1
    end
  end

  def create
    @page = params[:rent][:page].to_i
    @rents, amount = Rent.get_rents(@page, params[:rent][:dist_code], params[:rent][:rooms], params[:rent][:pattern])
    @pages = amount.to_i ? amount.to_i+1 : amount.to_i
    @last_page = amount/ITEMS_PER_PAGE + 1
    respond_to do |format|
      format.js { render :layout => false }
    end
  end


  def show
    redirect_to :action => :index if params[:id] == "index" #check if guys comming to old comilffo from google :D
    @rent = Rent.where(:id => params[:id]).first
  end

  def result

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

  def add_new_rent

  end

  def stree_autocompleet
    logger.warn params[:term]
#    @streets = Street.autocomplete_rus(params[:term])
    streets = Street.find_by_sql "select rus_name from streets where rus_name LIKE '%#{params[:term]}%'"
    streets_array = []
    streets.each{|street| streets_array << street.rus_name }
    respond_to do |format|
      format.json { render :json => streets_array, :layout => :false}
    end
  end

  def creates
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
      "&filter[dist_code]=#{filter[:dist_code]}&filter[rooms]=#{filter[:rooms]}&filter[search_query]=#{filter[:search_query]}"
    end
  end

  def print_params
    logger.warn "PARAMS : #{params}"
  end

  def validate_request
    nil unless request.xhr?
  end



