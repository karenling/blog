class SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(
      params[:user_email],
      params[:user_password]
    )

    if user
      login!(user)
      redirect_to user_path(user)
    else
      render json: 'Credentials were wrong'
    end
  end

  def new
  end

  def destroy
    logout!
    flash[:notice] = "You've been logged out!"
    redirect_to new_session_path
  end
end
