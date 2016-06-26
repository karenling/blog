class PhotosController < ApplicationController
  layout 'without_react'
  before_filter :require_current_user!
  skip_before_filter :log_event!

  def create
    @photo = Photo.new(photo_params)
    if @photo.save
      flash[:notice] = 'Photo uploaded!'
      redirect_to photos_path
    else
      flash.now[:error] = 'Photo upload failed.'
      render :new
    end
  end

  def index
    @photo = Photo.new
    @photos = Photo.all
  end

  private

  def photo_params
    params.require(:photo).permit(:url)
  end
end
