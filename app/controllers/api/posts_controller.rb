class Api::PostsController < ApplicationController
  def index
    if current_user
      @posts = Post.includes(:tags)
    else
      @posts = Post.includes(:tags).public_posts
    end
  end

  def show
    if current_user
      @post = Post.includes(:tags).find_by_id(params[:id])
    else
      @post = Post.includes(:tags).public_posts.find_by_id(params[:id])
    end

    unless @post
      render json: 'Must be author', status: :unprocessable_entity
    end
  end

end
