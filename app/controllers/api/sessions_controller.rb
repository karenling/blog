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
      render json: { base: ['Credentials were wrong'] }, status: 401
    end
  end


  def destroy
    if current_user
      logout!
      render json: {}
    else
      render json: { base: ['Not Found'] }, status: 404
    end
  end

  def show
    if current_user
      render json: { email: @current_user.email }
    else
      render json: {}
    end
  end
end
