include RspecLoginHelper

describe PostsController do
  before :each do
    @user = FactoryGirl.create(:user)
    @private_post = FactoryGirl.create(:post, author: @user, status: Post::PRIVATE)
    @draft_post = FactoryGirl.create(:post, author: @user, status: Post::DRAFT)
    @public_post = FactoryGirl.create(:post, author: @user, status: Post::PUBLIC)
  end

  describe 'new' do
    specify 'when non-logged in' do
      get :new
      expect(response).to redirect_to(new_session_path)
      expect(flash[:alert]).to eq('Must be logged in.')
    end
    specify 'when logged in' do
      login_as(@user)
      get :new
      expect(response).to render_template(:edit)
    end
  end

  describe 'create' do
    before :each do
      @post_params = { post: {
                        title: 'Some post title',
                        body: 'body here',
                        status: '0',
                        post_date: Time.current
                      }
                    }
    end
    specify 'when non-logged in' do
      post :create, @post_params
      expect(response).to redirect_to(new_session_path)
      expect(flash[:alert]).to eq('Must be logged in.')
    end
    specify 'when logged in' do
      login_as(@user)
      post :create, @post_params
      created_post = Post.find_by_title(@post_params[:post][:title])
      expect(response).to redirect_to(post_path(created_post))
      expect(flash[:notice]).to eq('Post created!')
    end
  end

  describe 'show' do
    describe 'when post is public' do
      specify 'logged in' do
        login_as(@user)
        get :show, id: @private_post.slug
        expect(response).to render_template(:show)
      end
      specify 'not logged in' do
        get :show, id: @private_post.slug
        expect(response).to redirect_to(posts_path)
        expect(flash[:alert]).to eq('Must be author.')
      end
    end

    describe 'when post is draft' do
      specify 'logged in' do
        login_as(@user)
        get :show, id: @draft_post.slug
        expect(response).to render_template(:show)
      end
      specify 'not logged in' do
        get :show, id: @draft_post.slug
        expect(response).to redirect_to(posts_path)
        expect(flash[:alert]).to eq('Must be author.')
      end
    end

    describe 'when post is public' do
      specify 'logged in' do
        login_as(@user)
        get :show, id: @public_post.slug
        expect(response).to render_template(:show)
      end
      specify 'not logged in' do
        get :show, id: @public_post.slug
        expect(response).to render_template(:show)
      end
    end
  end

  describe 'index' do
  end

  describe 'edit' do
    specify 'when non-logged in' do
      get :edit, id: @public_post.slug
      expect(response).to redirect_to(new_session_path)
      expect(flash[:alert]).to eq('Must be logged in.')
    end
    specify 'when logged in' do
      login_as(@user)
      get :edit, id: @public_post.slug
      expect(response).to render_template(:edit)
    end
  end

  describe 'update' do
    before :each do
      @post_params = { id: @public_post.slug,
                      post: {
                        title: 'Some post title',
                        body: 'body here',
                        status: '0',
                        post_date: Time.current
                      }
                    }
    end
    specify 'when non-logged in' do
      patch :update, @post_params
      expect(response).to redirect_to(new_session_path)
      expect(flash[:alert]).to eq('Must be logged in.')
    end
    specify 'when logged in' do
      login_as(@user)
      patch :update, @post_params
      expect(response).to redirect_to(post_path(@public_post.reload))
      expect(@public_post.reload.title).to eq('Some post title')
      expect(flash[:notice]).to eq('Post updated!')
    end
  end
end
