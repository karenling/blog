class Post < ActiveRecord::Base
  belongs_to :author, class_name: 'User', foreign_key: :user_id
  acts_as_taggable_on :tags

  validates_presence_of :title, :body, :status, :post_date, :user_id

  Post::PRIVATE = 0
  Post::DRAFT = 1
  Post::PUBLIC = 2

  default_scope { order('post_date DESC') }
  scope :public_posts, -> { where('posts.status = ?', Post::PUBLIC) }

  def humanized_post_date
    post_date
      .in_time_zone('Pacific Time (US & Canada)')
      .strftime('%A, %B %d, %Y')
  end

  def humanized_status
    case status
    when Post::PRIVATE then 'Private'
    when Post::DRAFT then 'Draft'
    when Post::PUBLIC then 'Public'
    end
  end

  def public?
    status == Post::PUBLIC
  end
end
