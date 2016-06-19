json.full_post do
  json.partial!('post_full', post: @post)
end
json.truncated_post do
  json.partial!('post_truncated', post: @post)
end
