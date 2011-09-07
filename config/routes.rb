Licemerov::Application.routes.draw do


  get "about/faq"

  get "about/feedback_form"

  get "about/blog"

  get "about/index"

  root :to => 'renter#listings'

  # user sessions routes
  get '/registration' => 'users#new', :as => :register
  get '/logout' => 'user_sessions#destroy', :as => :logout
  get '/login' => 'user_sessions#new', :as => :login
  get '/to_vk' => 'user_sessions#to_vk', :as => :to_vk
  get '/from_vk' => 'user_sessions#from_vk', :as => :from_vk

  get '/:user_profile', :to => 'users#show', :as => :user_profile
  match '/:user_profile/edit', :to => 'users#edit', :as => :edit_profile

  match 'estate/result', :to => 'estate#result'

  resources :root_entries, :only => [:create, :update], :controller => :main

  # user sessions routes
  get 'to_facebook' => 'user_sessions#to_facebook', :as => :to_facebook
  get 'facebook_callback' => 'user_sessions#facebook_callback', :as => :facebook_callback

  resources :user_sessions, :only => :create

  # User profile route
  get '/:user_profile' => 'users#show', :as => :user_profile #, :constraints => {:user_profile => /.{3,15}/}
  get '/:user_profile/edit' => 'user_details#edit', :as => :edit_user_profile
  get '/:user_profile/avatar/edit' => 'users#edit', :as => :edit_avatar

  # User routes
  resources :users, :only => [:create, :update]

  # User Details routes
  resources :user_details, :only => [:update]

  # User relationship
  resources :friendships, :only => [:create, :update, :destroy] do #, :path => '/:user_profile/friendships' do
    post :cancel, :on => :member
  end
  get '/:user_profile/friends' => 'friendships#show', :as => :friends

# ****************** Messages ******************
  resources :messages, :only => [:create, :destroy, :update] do
    post :recover, :on => :member
  end

  get '/:user_profile/messages' => 'messages#index', :as => :user_messages
  get '/:user_profile/messages/:id' => 'messages#show', :as => :show_message
  get '/:user_profile/new_message' => 'messages#new', :as => :new_message
  # ****************** Messages  END ******************

  #  ****************** Photo Albums ******************
  resources :albums, :only => [:create, :destroy, :update]
  get '/:user_profile/albums' => 'albums#index', :as => :user_albums
  get '/:user_profile/albums/:album_title' => 'albums#show', :as => :user_album
  get '/:user_profile/albums/:album_title/edit' => 'albums#edit', :as => :edit_user_album
  #  ****************** Photo Albums END ******************

  #  ****************** Photos ******************
  resources :photos, :only => [:create, :update, :destroy]
  get '/:user_profile/photos/:id' => 'photos#show', :as => :user_photo

  #  ****************** Photo Comments ******************
  resources :photo_comments, :only => [:create, :update, :destroy]

  #  ****************** Photos END ******************

  #  ****************** Rents ***********************

#  resources :rents do
#    get 'complete_street', :on => :collection
#    get 'add_new', :on => :collection
#  end

  resources :renter do
    collection do
      match :search
      match :dashboard
    end
  end

  resources :rentall, :only => [:new, :create, :destroy]
  match '/rentall/:id' => 'rentall#show', :as => 'rent'

#     match '/rents/stree_autocompleet', :to => 'rents#stree_autocompleet', :as => 'stree_autocompleet'
#  get '/rents/complete_street' => 'rents#complete_street'

#  resources :rents
#  do
##      get :complete_street
#      get :new, :as => :new_rent
#      post :add_new_rent
#  end




#
#  resources :estate do
#    collection do
#        get :result
#        get :paging
#    end
#  end


  #  ****************** Rents END ***********************

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
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

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => "welcome#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
