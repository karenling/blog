include RspecLoginHelper

describe PostsController do
  before :each do
    @user = FactoryGirl.create(:user)
    @private_post = FactoryGirl.create(:post, author: @user, status: Post::PRIVATE, post_date: Time.now)
    @draft_post = FactoryGirl.create(:post, author: @user, status: Post::DRAFT, post_date: Time.now - 1.day)
    @public_post = FactoryGirl.create(:post, author: @user, status: Post::PUBLIC, post_date: Time.now - 2.day)
    @future_public_post = FactoryGirl.create(:post, author: @user, status: Post::PUBLIC, post_date: Time.now + 3.days)
  end

  describe 'new' do
    specify 'when non-logged in' do
      get :new
      expect(response).to redirect_to(root_path)
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
      expect(response).to redirect_to(root_path)
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
        expect(Event.count).to eq(1)
        expect(Event.last.request_url).to eq(post_url(@private_post))
      end
      specify 'not logged in' do
        get :show, id: @private_post.slug
        expect(response).to redirect_to(posts_path)
        expect(flash[:alert]).to eq('Must be author.')
        # since the event logger is a before_filter, we do log this event
        expect(Event.count).to eq(1)
        expect(Event.last.request_url).to eq(post_url(@private_post))
      end
    end

    describe 'when post is draft' do
      specify 'logged in' do
        login_as(@user)
        get :show, id: @draft_post.slug
        expect(response).to render_template(:show)
        expect(Event.count).to eq(1)
        expect(Event.last.request_url).to eq(post_url(@draft_post))
      end
      specify 'not logged in' do
        get :show, id: @draft_post.slug
        expect(response).to redirect_to(posts_path)
        expect(flash[:alert]).to eq('Must be author.')
        expect(Event.count).to eq(1)
        expect(Event.last.request_url).to eq(post_url(@draft_post))
      end
    end

    describe 'when post is public' do
      specify 'logged in' do
        login_as(@user)
        get :show, id: @public_post.slug
        expect(response).to render_template(:show)
        expect(Event.count).to eq(1)
        expect(Event.last.request_url).to eq(post_url(@public_post))
      end
      specify 'not logged in' do
        get :show, id: @public_post.slug
        expect(response).to render_template(:show)
        expect(Event.count).to eq(1)
        expect(Event.last.request_url).to eq(post_url(@public_post))
      end
    end

    describe 'when post is public but in future' do
      specify 'logged in' do
        login_as(@user)
        get :show, id: @future_public_post.slug
        expect(response).to render_template(:show)
        expect(Event.count).to eq(1)
        expect(Event.last.request_url).to eq(post_url(@future_public_post))
      end
      specify 'not logged in' do
        get :show, id: @future_public_post.slug
        expect(response).to redirect_to(posts_path)
        expect(flash[:alert]).to eq('Must be author.')
        expect(Event.count).to eq(1)
        expect(Event.last.request_url).to eq(post_url(@future_public_post))
      end
    end
  end

  describe 'index' do
    specify 'when logged in user views index' do
      login_as(@user)
      get :index
      expect(assigns(:posts)).to match_array([@private_post, @draft_post, @public_post, @future_public_post])
      expect(Event.count).to eq(1)
      expect(Event.last.request_url).to eq(root_url)
    end
    specify 'when non-logged in user views index' do
      get :index
      expect(assigns(:posts)).to match_array([@public_post])
      expect(Event.count).to eq(1)
      expect(Event.last.request_url).to eq(root_url)
    end
  end

  describe 'edit' do
    specify 'when non-logged in' do
      get :edit, id: @public_post.slug
      expect(response).to redirect_to(root_path)
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
      expect(response).to redirect_to(root_path)
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
