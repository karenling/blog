class EventsController < ApplicationController
  before_filter :require_current_user!

  def index
    @title = 'Events'
    if params[:filter]
      @events = Event.where('user_id IS NULL')
    else
      @events = Event.all
    end
  end
end
