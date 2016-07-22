class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :admin

  before_filter :log_event!, :session_timezone

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
      store_location
      flash[:alert] = 'Must be logged in.'
      redirect_to root_path
    end
  end

  def admin
    User.first
  end

  def session_timezone
    @session_timezone = session[:timezone]
  end

  def log_event!
    return if is_a_bot?
    event = Event.new
    event.user_id = current_user.try(:id)
    session[:init] = true if !session.loaded?
    event.session_id = session[:session_id]
    event.request_url = request.url
    event.referrer_url = request.referrer
    event.request_user_agent = request.user_agent
    event.timezone = session_timezone
    Event.where(session_id: event.session_id).update_all(timezone: event.timezone, user_id: event.user_id)
    event.save
  end

  def is_a_bot?
    return false if request.user_agent.blank?
    bots = [
      'majestic12.co', 'feedly', 'ahrefs', 'baidu', 'exabot',
      'SeznamBot', 'Exabot', 'Googlebot', 'bingbot', 'commoncrawl',
      'dataprovider', 'Mechanize', 'ysearch/slurp', 'TestCrawler'
    ]
    bots.each do |bot|
      return true if request.user_agent.include?(bot)
    end
    return false
  end

  def store_location
    session[:forwarding_url] = request.url
  end
end
