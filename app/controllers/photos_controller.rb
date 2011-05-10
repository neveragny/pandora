class PhotosController < ApplicationController

  before_filter :require_user, :only => [:create, :update, :destroy]
  before_filter :existent_user, :only => :show
  before_filter :coerce_params, :only => :create

  layout Proc.new { |controller| controller.request.xhr?? false : 'application' }

  def show

  end

  def create
    @upload = Photo.new(params[:photo].merge({:user_id => current_user.id}))
    if @upload.save
      flash[:notice] = "Successfully created upload."
      respond_to do |format|
        format.json {
          render :json => json_for(@upload), :status => 200
        }
      end
    else
      render :action => 'show'
    end
  end

  def update

  end

  def destroy

  end

  private

  def coerce_params
    if params[:photo].nil?
      params[:photo] =
          Hash[[
                   [:user_id, current_user.id], [:album_id, params[:album_id]],
                   [:photo, params[:Filedata]]
               ]]
      params[:photo][:photo].content_type = MIME::Types.type_for(params[:photo][:photo].original_filename).to_s
    end
  end

end
