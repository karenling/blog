describe Post do
  describe 'humanized_post_date' do
    it 'should return properly formatted date' do
      post = FactoryGirl.create(:post, post_date: Time.parse('Nov 27, 2016, 9:00am PST'))
      expect(post.humanized_post_date).to eq('Sunday, November 27, 2016')
    end
  end
  describe 'humanized_status' do
    specify 'when private post' do
      post = FactoryGirl.create(:post, status: Post::PRIVATE)
      expect(post.humanized_status).to eq('Private')
    end
    specify 'when draft post' do
      post = FactoryGirl.create(:post, status: Post::DRAFT)
      expect(post.humanized_status).to eq('Draft')
    end
    specify 'when public post' do
      post = FactoryGirl.create(:post, status: Post::PUBLIC)
      expect(post.humanized_status).to eq('Public')
    end
  end
  describe 'set_friendly_name!' do
    it 'should change friendly id' do
      post = FactoryGirl.create(:post, post_date: Time.parse('Nov 18, 2016, 9:00am PST'))
      post.update(title: 'Twinkie is awesome')
      post.set_friendly_name!
      expect(post.slug).to eq('2016-11-18-twinkie-is-awesome')
    end
  end
end
