# include RspecLoginHelper
#
# describe UsersController do
#   before :each do
#     @user = FactoryGirl.create(:user)
#   end
#
#   describe 'create' do
#     it 'should create a new user' do
#       params = {
#         user: {
#           email: Faker::Internet.email,
#           password: Faker::Internet.password(8)
#           }
#       }
#       expect{ post :create, params }.to change{ User.count }.by(1)
#       expect(assigns(:current_user).email).to eq(params[:user][:email])
#       expect(flash[:notice] = 'Account created!')
#     end
#     it 'should create a new user' do
#       params = {
#         user: {
#           email: Faker::Internet.email,
#           password: Faker::Internet.password(3)
#           }
#       }
#       expect{ post :create, params }.to change{ User.count }.by(0)
#       expect(flash[:error]).to eq('Password is too short (minimum is 6 characters)')
#       expect(response).to render_template(:new)
#     end
#   end
#
#   describe 'new' do
#     it 'should render new view' do
#       get :new
#       expect(response).to render_template(:new)
#     end
#   end
#
#   describe 'show' do
#     it 'should render show view for logged in user' do
#       login_as(@user)
#       get :show, id: @user.id
#       expect(response).to render_template(:show)
#     end
#     it 'should not render show view for non-logged in user' do
#       get :show, id: @user.id
#       expect(response).to redirect_to(new_session_path)
#     end
#   end
# end
