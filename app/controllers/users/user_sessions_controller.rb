class UserSessionsController < ApplicationController

  US = UserSession # shortcut

  skip_before_filter :existent_user

  before_filter :require_no_user, :only => [:new, :create]
  before_filter :require_user, :only => [:destroy]

  def new
    @session = US.new
  end


  def create
    @session = US.new(params[:user_session])
    if @session.save
      @current_user = US.find.record
      redirect_to(home_page)#, :notice => 'Welcome!')
    else
      redirect_to(login_path, :alert => 'Failed to log in, please try again')
    end
  end

  def destroy
    @session = US.find
    @session.destroy
    redirect_to login_path
  end

end
