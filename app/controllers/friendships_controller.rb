class FriendshipsController < ApplicationController

  skip_before_filter :existent_user, :except => [:show, :show_pending]
  skip_before_filter :delete_friendships, :except => [:show]
  before_filter :require_user
  before_filter :require_owner, :only => :show_pending


  def show # Show user friends
    @friends = User.friends_of(@user)
    respond_to do |format|
      format.html { render :template => 'friendships/show.erb' }
      format.js { render :layout => false }
    end
  end

  def show_pending # Show pending user friends ( e.g. someone added current_user to friend list and awaits confirmation
    @friends = User.pending_friends_of(current_user)
    respond_to do |format|
      format.html { render :template => 'friendships/show_pending.erb' }
      format.js { render :layout => false }
    end
  end

  def create # Invite friend
    @friendship = current_user.friendships.build(:friend_id => params[:friend_id])
    @friendship.save
    respond_to do |format|
      format.js { render :layout => false }
    end
  end

  def update # Confirm or Cancel friendship
    @friendship = current_user.friendship_with(User.find(params[:user_id]), :approved => :all)
    if @friendship
      if params[:approved].to_i == 0
        @friendship.destroy
      else
        @friendship.approved, @friendship.canceled = true, false
        @friendship.save
      end
    end
    respond_to do |format|
      format.js { render :layout => false }
    end
  end

  def destroy # delete friendship
    @friendship = Friendship.find params[:id]
    @friendship.marked_as_deleted = true
    @friendship.save
    respond_to do |format|
      format.js { render :layout => false }
    end
  end

  def cancel_deletion # cancel friendship deletion
    @friendship = Friendship.find params[:id]
    @friendship.marked_as_deleted = false
    @friendship.save
    respond_to do |format|
      format.js { render :nothing => true }
    end
  end

  def cancel # cancel permanently (add to black list)

  end

  private

end
