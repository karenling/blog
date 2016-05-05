class Post < ActiveRecord::Base
  extend FriendlyId
  friendly_id :friendly_name, use: :slugged

  belongs_to :author, class_name: 'User', foreign_key: :user_id
  acts_as_taggable_on :tags

  # default pagination
  Post::PER_PAGE = 5
  self.per_page = Post::PER_PAGE

  validates_presence_of :title, :body, :status, :post_date, :user_id

  Post::PRIVATE = 0
  Post::DRAFT = 1
  Post::PUBLIC = 2

  default_scope { order('post_date DESC') }
  scope :public_posts, -> { where('posts.status = ? AND posts.post_date <= ?', Post::PUBLIC, Time.current) }

  before_save :set_friendly_name!

  @@markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML.new(hard_wrap: true, link_attributes: { target: '_blank' }), hard_wrap: true, autolink: true, strikethrough: true)

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
    @@markdown.render(body).html_safe
  end

  def humanized_body_truncated
    length_of_imgs_links = self.body.scan(/!?\[.*\]\(([^)]+)\)/).join.length
    Nokogiri::HTML::DocumentFragment.parse(@@markdown.render(body).truncate(length_of_imgs_links + 300, separate: ' ', omission: "<a href='/posts/#{slug}' class='read-full'>...Read Full Post</a>")).to_html.html_safe
  end

  def set_friendly_name!
    self.friendly_name = self.post_date.in_time_zone('Pacific Time (US & Canada)').strftime('%Y-%m-%d') + '-' + self.title.parameterize
    self.slug = self.friendly_name
  end
end
