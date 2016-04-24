class Photo < ActiveRecord::Base
  mount_uploader :url, PhotoUploader

  default_scope { order('created_at DESC') }
end
