json.posts do
  json.array!(@posts) do |post|
    json.partial!('post', post: post)
  end
end
json.total_posts @total_posts
json.pages_loaded @pages_loaded
