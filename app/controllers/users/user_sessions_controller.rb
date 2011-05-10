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
<<<<<<< HEAD
      cookies[:user_id] = @current_user.id
      redirect_to(home_page)#, :notice => 'Welcome!')
=======
      session[:return_to] ? redirect_to(session[:return_to]) :
          redirect_to(home_page, :notice => 'Welcome!')
>>>>>>> 2d1f1c36d842ede52c00e7f9d50e31a7c4107c22
    else
      redirect_to(login_path, :alert => 'Failed to log in, please try again')
    end
  end

  def destroy
    @session = US.find
    @session.destroy
<<<<<<< HEAD
    cookies[:user_id] = ""
=======
>>>>>>> 2d1f1c36d842ede52c00e7f9d50e31a7c4107c22
    redirect_to login_path
  end

end
