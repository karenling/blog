json.current_posts do
  json.array!(@posts) do |post|
    json.id post.id
    json.title post.title
    json.body post.humanized_body_truncated
    json.post_date post.humanized_post_date
    json.friendly_name post.friendly_name
    json.header_image post.header_image
    json.status post.humanized_status if @current_user
  end
end
json.total_posts @totalCount
