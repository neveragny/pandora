class AboutController < ApplicationController

  skip_before_filter :existent_user

  def faq
  end

  def feedback_form
    @feedback = Feedback.new
    render :layout => false
#    respond_to do |format|
#      format.html {@feedback, render :layout => false}
#    end
  end

  def feedback_submit
    @feedback = Feedback.new(params[:feedback])
    if @feedback.save 
      render :layout => false and return
    end
    render :layout => false, :notice => "smth goes wrong"
  end

  def blog
  end

  def index
  end

end
