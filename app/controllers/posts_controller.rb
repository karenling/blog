class PostsController < ApplicationController
  before_filter :require_current_user!, only: [:new, :create, :edit, :update]

  def new
    @title = 'New Post'
    @post = Post.new
    render :edit
  end

  def create
    @post = current_user.posts.new(post_params)
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
    @title = @post.title
    if !current_user && !@post.public?
      flash[:alert] = 'Must be author.'
      redirect_to posts_path
    end
  end

  def index
    @title = 'All Posts'
    @truncate = true
    if current_user
      @posts = Post.paginate(:page => params[:page])
    else
      @posts = Post.public_posts.paginate(:page => params[:page])
    end
  end

  def edit
    @post = Post.find(params[:id])
    @title = "Edit #{@post.title}"
  end

  def tagged
    @title = "Posts tagged with #{params[:tag_name]}"
    if current_user
      @posts = Post.tagged_with(params[:tag_name]).paginate(:page => params[:page])
    else
      @posts = Post.public_posts.tagged_with(params[:tag_name]).paginate(:page => params[:page])
    end
    render :index
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
    params.require(:post).permit(:title, :body, :status, :post_date, :tag_list)
  end
end
