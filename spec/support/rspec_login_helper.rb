module RspecLoginHelper
  def login_as(user)
    request.session[:session_token] = user.session_token
    user
  end

  def current_user
    User.find(request.session[:session_token])
  end
end
