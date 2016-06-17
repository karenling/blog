class Api::PostsController < ApplicationController
  def index
    limit = params[:limit].to_i
    if current_user
      posts = Post.includes(:tags).limit(limit)
    else
      posts = Post.includes(:tags).public_posts.limit(limit)
    end
    @posts = posts[(limit - Post::PER_PAGE)..limit]
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
