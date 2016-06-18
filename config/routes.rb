Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
  root 'posts#index'
  # resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  resources :posts, only: [:new, :create, :show, :index, :edit, :update]
  resources :photos, only: [:create, :index]
  resources :events, only: [:index] do
    collection do
      post 'set_timezone'
    end
  end

  get 'feed' => 'posts#feed', as: 'posts_feed', format: 'rss'
  get 'posts/tagged/:tag_name' => 'posts#tagged', as: 'tagged_posts'
  get 'about' => 'pages#about', as: 'about'
  get 'contact' => 'pages#contact', as: 'contact'
  post 'send_contact' => 'pages#send_contact', as: 'send_contact'

  namespace :api , defaults: { format: :json } do
    resources :posts, only: [:new, :create, :show, :index, :edit, :update]
    post 'send_contact' => 'pages#send_contact', as: 'send_contact'
  end
  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
  get '*path' => redirect('/') #if Rails.env.production?
end
