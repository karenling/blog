# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

abort if Rails.env.production?

user = FactoryGirl.create(:user, email: 'test@test.com', password: 'testing')
2.times do
  FactoryGirl.create(:post, author: user, status: Post::PUBLIC)
  FactoryGirl.create(:post, author: user, status: Post::DRAFT)
  FactoryGirl.create(:post, author: user, status: Post::PRIVATE)
end
