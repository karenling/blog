class UsersController < ApplicationController
  before_action :require_current_user!, only: [:show]
  
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to user_path(@user)
    else
      render json: @user.errors.full_messages
    end
  end

  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end