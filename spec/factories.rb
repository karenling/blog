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
    post_date { Time.current + rand(-50..50).days }
    tag_list { "#{Faker::Color.color_name}, #{Faker::Color.color_name}, #{Faker::Color.color_name}" }
  end
end
