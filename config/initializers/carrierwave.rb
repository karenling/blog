CarrierWave.configure do |config|
  config.fog_credentials = {
    provider:              'AWS',                        # required
    aws_access_key_id:     ENV['AMAZONS3_ACCESS_KEY'],                        # required
    aws_secret_access_key: ENV['AMAZONS3_SECRET_ACCESS_KEY'],                        # required
    region:                'us-west-1',                  # optional, defaults to 'us-east-1'
    host:                  's3-us-west-1.amazonaws.com',             # optional, defaults to nil
  }
  config.fog_directory  = 'images.karenling.net'                          # required
  config.fog_public     = true                                        # optional, defaults to true
end
