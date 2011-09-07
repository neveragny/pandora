require 'test_helper'

class AboutControllerTest < ActionController::TestCase
  test "should get faq" do
    get :faq
    assert_response :success
  end

  test "should get feedback_form" do
    get :feedback_form
    assert_response :success
  end

  test "should get blog" do
    get :blog
    assert_response :success
  end

  test "should get index" do
    get :index
    assert_response :success
  end

end
