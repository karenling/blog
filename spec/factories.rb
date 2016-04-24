FactoryGirl.define do
  factory :user, aliases: [:author] do
    email { Faker::Internet.email }
    password { Faker::Internet.password(8) }
  end

  factory :post do
    association :author
    title { Faker::Book.title }
    body { Faker::Lorem.paragraph(4) }
    status { [Post::PRIVATE, Post::DRAFT, Post::PUBLIC].sample }
    post_date { Time.current }
  end
end
