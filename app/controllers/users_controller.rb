class UsersController < ApplicationController
  before_action :require_current_user!, only: [:show]
  
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      flash[:notice] = 'Account created!'
      redirect_to user_path(@user)
    else
      flash[:error] = @user.errors.full_messages.to_sentence
      render :new
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
