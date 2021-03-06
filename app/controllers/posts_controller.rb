class PostsController < ApplicationController
  before_filter :require_current_user!, only: [:new, :create, :edit, :update]
  skip_before_filter :log_event!, only: [:new, :create, :edit, :update]

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
    render 'index'
  end

  def page
    render 'index'
  end

  def index
    render 'index'
  end

  def edit
    @post = Post.includes(:tags).find_by_friendly_name(params[:id])
    @title = "Edit #{@post.title}"
  end

  def tagged
    @title = "Posts tagged with #{params[:tag_name]}"
    @truncate = true
    if current_user
      @posts = Post.includes(:tags).tagged_with(params[:tag_name]).page(params[:page])
    else
      @posts = Post.includes(:tags).public_posts.tagged_with(params[:tag_name]).page(params[:page])
    end
    render :index
  end

  def update
    @post = Post.find_by_friendly_name(params[:id])
    if @post.update(post_params)
      flash[:notice] = 'Post updated!'
      redirect_to post_path(@post)
    else
      flash.now[:error] = 'Post update failed.'
      render :edit
    end
  end

  def feed
    @posts = Post.public_posts.limit(10)
    respond_to do |format|
      format.rss { render layout: false }
    end
  end

  private

  def post_params
    params[:post][:post_date] = ActiveSupport::TimeZone.new('Pacific Time (US & Canada)').parse(params[:post][:post_date]).utc
    params.require(:post)
      .permit(:title, :preview, :body, :status, :post_date, :tag_list, :header_image)
  end
end
