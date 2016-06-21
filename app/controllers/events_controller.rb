class EventsController < ApplicationController
  layout 'without_react'
  
  before_filter :require_current_user!, only: [:index]
  skip_before_filter :log_event!

  def index
    @title = 'Events'
    if params[:all]
      @events = Event.page(params[:page])
    else
      @events = Event.where('user_id IS NULL').page(params[:page])
    end
  end

  def set_timezone
    session[:timezone] = params[:location]
    render json: ''
  end
end
