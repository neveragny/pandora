class AboutController < ApplicationController

  skip_before_filter :existent_user

  def faq
  end

  def feedback_form
    respond_to do |format|
      format.html {render :layout => false}
    end
  end

  def blog
  end

  def index
  end

end
