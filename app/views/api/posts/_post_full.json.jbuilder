json.id post.id
json.title post.title
json.body post.body
json.post_date post.humanized_post_date
json.post_date_for_field set_post_date(post)
json.friendly_name post.friendly_name
json.header_image post.header_image
json.status post.humanized_status if @current_user
