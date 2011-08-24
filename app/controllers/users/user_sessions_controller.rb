class UserSessionsController < ApplicationController

  US = UserSession # shortcut


  skip_before_filter :beta_version, :only => [:new, :create]
  skip_before_filter :existent_user


  before_filter :require_no_user, :only => [:new, :create]
  before_filter :require_user, :only => [:destroy]

  def new
    @body = "login"
    @session = US.new
  end


  def create
    @session = US.new(params[:user_session])
    @session.save do |result|
      if result
      @current_user = US.find.record
      session[:return_to] ? redirect_to(session[:return_to]) :
          redirect_to(home_page, :notice => 'Welcome!')
      else
      redirect_to(login_path, :alert => 'Failed to log in, please try again')
      end
    end
  end

  def destroy
    @session = US.find
    @session.destroy
    redirect_to login_path
  end

  def to_facebook
      options = {
        :redirect_uri => facebook_callback_url,
        :scope => "email,publish_stream" # whatever you want to do
      }
      client = OAuth2::Client.new(FACEBOOK_API_KEY, FACEBOOK_API_SECRET, :site => FACEBOOK_API_SITE)

      redirect_to client.web_server.authorize_url(options)
  end

  def facebook_callback
      client = OAuth2::Client.new(FACEBOOK_API_KEY, FACEBOOK_API_SECRET, :site => FACEBOOK_API_SITE)
      access_token = client.web_server.get_access_token(params[:code], :redirect_uri => facebook_callback_url)

      do_my_custom_user_association(access_token)
  end



end
