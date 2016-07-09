class Post < ActiveRecord::Base
  extend FriendlyId
  friendly_id :friendly_name, use: :slugged

  belongs_to :author, class_name: 'User', foreign_key: :user_id
  acts_as_taggable_on :tags

  # default pagination
  paginates_per 2

  validates_presence_of :title, :body, :status, :post_date, :user_id
  validates_uniqueness_of :friendly_name, :slug

  Post::PRIVATE = 0
  Post::DRAFT = 1
  Post::PUBLIC = 2

  PER_PAGE = 2

  paginates_per 2

  default_scope { order('post_date DESC') }
  scope :public_posts, -> { where('posts.status = ? AND posts.post_date <= ?', Post::PUBLIC, Time.current) }

  before_save :set_friendly_name!

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

  def humanized_body
    body.html_safe
  end

  def humanized_body_truncated
    Nokogiri::HTML::DocumentFragment.parse(body.truncate(400, separator: ' ')).to_html.html_safe
  end

  def set_friendly_name!
    self.friendly_name = self.post_date.in_time_zone('Pacific Time (US & Canada)').strftime('%Y-%m-%d') + '-' + self.title.parameterize
    self.slug = self.friendly_name
  end
end
