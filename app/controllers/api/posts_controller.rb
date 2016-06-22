class Api::PostsController < ApplicationController
  before_filter :require_current_user!, only: [:new, :create, :edit, :update]
  skip_before_filter :log_event!, only: [:new, :create, :edit, :update]

  def index
    if current_user
      @posts = Post.includes(:tags).page(params[:page])
      @total_posts = Post.count
    else
      @posts = Post.includes(:tags).public_posts.page(params[:page])
      @total_posts = Post.public_posts.count
    end
    @pages_loaded = params[:page]
  end

  def show
    begin
      if current_user
        @post = Post.includes(:tags).friendly.find(params[:id])
      else
        @post = Post.includes(:tags).public_posts.friendly.find(params[:id])
      end
    rescue ActiveRecord::RecordNotFound => e
      render json: { base: 'Must be author' }, status: :unprocessable_entity
    end
  end

  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      render :post
    else
      render json: @post.errors.full_messages.to_sentence, status: :unprocessable_entity
    end
  end

  def update
    @post = Post.friendly.find(params[:id])
    if @post.update(post_params)
      render :post
    else
      render json: @post.errors.full_messages.to_sentence, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params[:post].delete('friendly_name')
    params[:post].delete('errorMessage')
    params[:post][:post_date] = ActiveSupport::TimeZone.new('Pacific Time (US & Canada)').parse(params[:post][:post_date]).utc
    params.require(:post).permit(:title, :header_image, :body, :status, :post_date, :tag_list)
  end
end
