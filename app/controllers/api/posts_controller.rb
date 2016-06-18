class Api::PostsController < ApplicationController
  before_filter :require_current_user!, only: [:new, :create, :edit, :update]
  skip_before_filter :log_event!, only: [:new, :create, :edit, :update]
  
  def index
    limit = params[:limit].to_i
    if current_user
      posts = Post.includes(:tags).limit(limit)
    else
      posts = Post.includes(:tags).public_posts.limit(limit)
    end
    @posts = posts[(limit - Post::PER_PAGE)..limit]
    @totalCount = Post.count
  end

  def show
    if current_user
      @post = Post.includes(:tags).friendly.find(params[:id])
    else
      @post = Post.includes(:tags).public_posts.friendly.find(params[:id])
    end

    unless @post
      render json: 'Must be author', status: :unprocessable_entity
    end
  end

end
