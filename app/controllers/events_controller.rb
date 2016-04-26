class EventsController < ApplicationController
  before_filter :require_current_user!

  def index
    @title = 'Events'
    if params[:filter]
      @events = Event.where('user_id IS NULL').paginate(:page => params[:page])
    else
      @events = Event.paginate(:page => params[:page])
    end
  end
end
