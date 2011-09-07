
class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_user_session, :current_user, :cu, :profile_owner?, :home_page, :details,
                :guilty_response, :json_for

  before_filter :existent_user
  before_filter :delete_messages
  before_filter :log_request
#  before_filter :beta_version


  BETA = false


  # Prepare a hash( to be converted to json ) for a newly created object
  # Includes partial, message and an html class for a notice
  def json_for(object)
    if object.errors.any?
      Hash[[ [:errors, object.errors.values.map(&:first)], [:html_class, :alert] ]]
    else
      instance = object.class.name.downcase
      partial = instance.dup.insert(0, '_').insert(-1, '.erb')
      path = Pathname.new(Rails.root.join('app', 'views', instance.pluralize))

      if path.directory? && path.entries.map { |e| e.to_s }.include?(partial)
        Hash[ [ [instance.to_sym, render_to_string(:partial => instance.pluralize + '/' + instance,
                                                   :locals => {instance.to_sym => object})],
                [:message, t(instance.insert(-1, '_created'))],
                [:html_class, :notice]
              ] ]
      else
        nil
      end

    end
  end

#  unless ActionController::Base.consider_all_requests_local
#    rescue_from Exception, :with => :render_error
#    rescue_from ActiveRecord::RecordNotFound, :with => :render_not_found
#    rescue_from ActionController::RoutingError, :with => :render_not_found
#    rescue_from ActionController::UnknownController, :with => :render_not_found
#    rescue_from ActionController::UnknownAction, :with => :render_not_found
#  end

  private

  def render_not_found(exception)
#    log_error(exception)
    render :template => "/error/404.html.erb", :status => 404
  end

  def render_error(exception)
#    log_error(exception)
    render :template => "/error/500.html.erb", :status => 500
  end

  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.record
  end


  def details
    return @details if defined?(@details)
    @details = current_user && current_user.details
  end

  def require_user
    Rails.logger.debug "require user"
    unless current_user
      store_location
      flash[:notice] = "Please log in"
      redirect_to login_url
      false
    end
  end

  def require_owner
    Rails.logger.debug "require_owner"
    if current_user && @user
      redirect_to home_page unless current_user == @user
    else
      redirect_to :controller => :main
      false
    end
  end

  def require_no_user
    Rails.logger.debug "require_no_user"
    if current_user
      store_location
      flash[:notice] = "You're already authenticated!"
      redirect_to home_page
      false
    end
  end

  def store_location
    session[:return_to] = request.fullpath
  end

  def redirect_back_or_default(default)
    redirect_to(session[:return_to] || default)
    session[:return_to] = nil
  end

  def existent_user
    Rails.logger.debug "PARAMS => #{params}"
    return @user if defined?(@user)
    @user = User.where(:login => params[:user_profile]).first
    redirect_to root_path unless @user
  end

  def delete_messages
    if current_user
      current_user.messages.deleted.each {|message|  message.destroy  }
    end
  end

  def home_page
    current_user && user_profile_url(current_user)
  end

  def profile_owner?
    if current_user && @user
      @user == current_user
    else
      false
    end
  end

  def guilty_response
    {:text => 'The server understood the request, but is refusing to serve it', :status => 403}
  end

  def beta_version
    if BETA
      redirect_to login_path unless @current_user
    end
  end

  def log_request
    Rails.logger.debug "==================================\n
                        Ip: #{request.ip}\n
                        method: #{request.method}
                        fullpath: #{request.fullpath}
                        params: #{request.query_parameters() }\n
                        time: #{Time.now}
                      \n=================================="
  end

  alias :cu :current_user

end
