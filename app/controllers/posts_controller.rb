class PostsController < ApplicationController
  before_filter :require_current_user!, only: [:new, :create, :edit, :update]

  def new
    @post = Post.new
    render :edit
  end

  def create
    @post = @current_user.posts.new(post_params)
    if @post.save
      flash[:notice] = 'Post created!'
      redirect_to post_path(@post)
    else
      flash.now[:error] = @post.errors.full_messages.to_sentence
      render :new
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def index
    @posts = current_user ? Post.all : Post.public_posts
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      flash[:notice] = 'Post updated!'
      redirect_to post_path(@post)
    else
      flash.now[:error] = 'Post update failed.'
      render :edit
    end
  end

  private

  def post_params
    if params[:post][:post_date].blank?
      params[:post][:post_date] = Time.now
    else
      params[:post][:post_date] = Time.parse(params[:post][:post_date])
    end
    params.require(:post).permit(:title, :body, :status, :post_date)
  end
end
