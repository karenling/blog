class Photo < ActiveRecord::Base
  mount_uploader :url, PhotoUploader

  default_scope { order('created_at DESC') }

  def image_url
    url.to_s.gsub('https://', 'http://').gsub('.s3.amazonaws.com', '')
  end
end
