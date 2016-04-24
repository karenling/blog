class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :admin

  before_filter :log_event!

  def login!(user)
    @current_user = user
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.try(:reset_session_token!)
    session[:session_token] = nil
  end
  
  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def require_current_user!
    unless current_user
      flash[:alert] = 'Must be logged in.'
      redirect_to new_session_path
    end
  end

  def admin
    User.first
  end

  def log_event!
    event = Event.new
    event.user_id = current_user.try(:id)
    event.session_id = session[:session_id]
    event.request_url = request.url
    event.referrer_url = request.referrer
    event.request_user_agent = request.user_agent
    event.save
  end
end
