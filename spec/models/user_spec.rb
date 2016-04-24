describe User do
  before :each do
    @user = FactoryGirl.create(:user, password: 'fakepassword')
  end
  
  describe 'self.find_by_credentials' do
    it 'should return correct user' do
      returned_user = User.find_by_credentials(@user.email, @user.password)
      expect(returned_user).to eq(@user)
    end
    it 'should return nil if user password doesn\'t match' do
      returned_user = User.find_by_credentials(@user.email, 'pink')
      expect(returned_user).to be(nil)
    end
  end

  describe 'is_password?' do
    it 'should return true if passwords match' do
      expect(@user.is_password?('fakepassword')).to be(true)
    end
    it 'should return false if passwords don\'t match' do
      expect(@user.is_password?('fakepasswrd')).to be(false)
    end
  end

  describe 'reset_session_token!' do
    it 'should reset user session token' do
      original_session_token = @user.session_token
      @user.reset_session_token!
      expect(@user.session_token).to_not eq(original_session_token)
    end
  end

  describe 'ensure_session_token' do
    it 'should generate a session token for user after initialize' do
      expect(User.new.session_token).to_not be("")
    end
  end

  describe 'dependent destroy' do
    it 'should destroy all of users post if user is destroyed' do
      5.times { FactoryGirl.create(:post, author: @user) }
      expect(@user.posts.count).to eq(5)
      expect(Post.count).to eq(5)
      @user.destroy
      expect(Post.count).to eq(0)
    end
  end
end
