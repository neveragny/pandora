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

  def to_vk
      options = {
        :redirect_uri => 'http://nomoveton.co.ua/from_vk',
        :scope => "wall,notify,friends,photos,groups" # whatever you want to do
      }
      @client = client

      redirect_to client.auth_code.authorize_url(options)
  end

  def from_vk
      @client = client
#      Rails.logger.debug "@client" + client
      access_token = client.auth_code.get_token(params[:code], :redirect_uri => 'http://nomoveton.co.ua/from_vk')
      access_token.options[:param_name] = 'access_token'
      access_token.options[:mode] = :query
      Rails.logger.debug "access_token :  #{access_token}"
      Rails.logger.debug "access_token.options #{access_token.options} "
      
      if access_token.token.blank?
        redirect_to(login_path, :alert => 'Failed to log in, please try again')
      else
        Rails.logger.debug "TOKEN : #{access_token.token}"
        #user_data = get_user access_token
#        Rails.logger.debug user_data
            
        field = fields = 'uid, first_name, last_name, nickname, screen_name, sex, bdate, city, country, timezone, photo, photo_medium, photo_big, has_mobile, rate, contacts, education, online'
        user_data = access_token.get("/method/getProfiles", :params => {:uid=> access_token.params['user_id'], :fields => fields }).parsed['response'].first
#        Rails.logger.debug user_data
        @user = User.new_or_find_by_vk_oauth_access_token(access_token.token, {:user_data => user_data})

        if @user.new_record?
          session[:user] = @user
          session[:external_app] = "vkontakte"
          @user.save(:validate => false)
        else
          @session = US.create(@user)
          @session.save do |result|
            if result
              @current_user = US.find.record
              session[:return_to] ? redirect_to(session[:return_to]) : redirect_to(home_page, :notice => 'Welcome!')
            else
              redirect_to(login_path, :alert => 'Failed to log in, please try again')
            end
          end
        end
        
      end
#      Rails.logger.debug "responce: #{resp} "
      
  end


  private
  def client
    OAuth2::Client.new('2451301', 'M2bRILJgXVcdRqVVCdss',
                                  :site => 'https://api.vk.com/',
                                  :token_url => '/oauth/token',
                                  :authorize_url => '/oauth/authorize',
                                  :ssl => {:ca_path => "/etc/ssl/certs"}
                                  )
  end

  def get_user(access_token)
    profiles = '/method/getProfiles'
    fields = 'uid, first_name, last_name, nickname, screen_name, sex, bdate (birthdate), city, country, timezone, photo, photo_medium, photo_big, has_mobile, rate, contacts, education, online'
    access_token.get('/method/getProfiles', :params => {:uid=> access_token.params['user_id']} ).parsed['responce'].first
    
  end


end


#def client
#  OAuth2::Client.new(CLIENT_ID, CLIENT_SECRET,
#                     :site => 'https://api.vk.com/',
#                     :token_url => '/oauth/token',
#                     :authorize_url => '/oauth/authorize'
#                    )
#end
#
#get '/auth/vk' do
#  url = client.auth_code.authorize_url(
#    :redirect_uri => redirect_uri,
#    :scope => ''
#  )

#http://api.vkontakte.ru/oauth/authorize?
# client_id=APP_ID&
# scope=SETTINGS&
# redirect_uri=REDIRECT_URI&
# response_type=code


#APP_ID:2451301
#KEY: M2bRILJgXVcdRqVVCdss

#------


#https://api.vkontakte.ru/oauth/access_token?
#client_id=APP_ID&
#client_secret=APP_SECRET&
#code=7a6fa4dff77a228eeda56603b8f53806c883f011c40b72630bb50df056f6479e52a
