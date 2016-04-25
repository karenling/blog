module PostsHelper
  def post_status_options
    ['private', 'draft', 'public'].
      zip([Post::PRIVATE, Post::DRAFT, Post::PUBLIC])
  end

  def set_post_date(post = nil)
    if post.new_record?
      time = Time.current.in_time_zone('Pacific Time (US & Canada)')
    else
      time = post.post_date.in_time_zone('Pacific Time (US & Canada)')
    end
    time.strftime('%Y-%m-%dT%H:%M')
  end

  def display_tags(tags)
    tags.sort{ |x, y| x.name <=> y.name }.map do |tag|
      link_to(tag.name, tagged_posts_path(tag.name))
    end
  end

  def all_tags
    if current_user
      admin.posts.tag_counts_on(:tags)
    else
      admin.posts.public_posts.tag_counts_on(:tags)
    end
  end
end
