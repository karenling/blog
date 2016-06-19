FactoryGirl.define do
  factory :user, aliases: [:author] do
    email { Faker::Internet.email }
    password { Faker::Internet.password(8) }
  end

  factory :post do
    association :author
    title { Faker::Book.title }
    body { (1..rand(1..4)).to_a.map { "<p>#{Faker::Lorem.paragraph(20)}</p>" }.join }
    status { [Post::PRIVATE, Post::DRAFT, Post::PUBLIC].sample }
    post_date { Time.current + rand(-50..50).days }
    tag_list { "#{Faker::Color.color_name}, #{Faker::Color.color_name}, #{Faker::Color.color_name}" }
  end
end
