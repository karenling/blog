module PostsHelper
  def post_status_options
    ['private', 'draft', 'public'].
      zip([Post::PRIVATE, Post::DRAFT, Post::PUBLIC])
  end

  def set_post_date(post = nil)
    if post.new_record?
      time = Time.current.in_time_zone('Pacific Time (US & Canada)')
    else
      time = post.post_date
    end
    time.strftime('%Y-%m-%dT%H:%M')
  end
end
