json.current_posts do
  json.array!(@posts) do |post|
    json.partial!('post_truncated', post: post)
  end
end
json.total_posts @total_posts
json.pages_loaded @pages_loaded
