module PostsHelper
  def post_status_options
    ['private', 'draft', 'public'].
      zip([Post::PRIVATE, Post::DRAFT, Post::PUBLIC])
  end
end
