json.current_posts do
  json.array!(@posts) do |post|
    json.partial!('post', post: post)
  end
end
json.total_posts @totalCount
