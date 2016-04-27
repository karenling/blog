class EventsController < ApplicationController
  before_filter :require_current_user!
  skip_before_filter :log_event!

  def index
    @title = 'Events'
    if params[:all]
      @events = Event.paginate(:page => params[:page])
    else
      @events = Event.where('user_id IS NULL').paginate(:page => params[:page])
    end
  end
end
