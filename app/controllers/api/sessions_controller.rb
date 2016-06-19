class Api::SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(
      params[:user_email],
      params[:user_password]
    )

    if user
      login!(user)
      render json: { email: @current_user.email }
    else
      render json: { base: 'Credentials were wrong' }, status: 401
    end
  end


  def destroy
    logout!
    render json: { base: "You've been logged out!" }
  end

  def show
    render json: { email: @current_user.email } || {}
  end
end
