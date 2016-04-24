describe Post do
  describe 'humanized_post_date' do
    it 'should return properly formatted date' do
      post = FactoryGirl.create(:post, post_date: 'November 28, 1989')
      expect(post.humanized_post_date).to eq('Monday, November 27, 1989')
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
end
