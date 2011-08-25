class UserSession < Authlogic::Session::Base
  
  def self.oauth_consumer
    OAuth::Consumer.new("2451301", "M2bRILJgXVcdRqVVCdss",
    { :site=>"http://api.vkontakte.ru/oauth/authorize",
	:authorize_url => "http://api.vkontakte.ru/oauth/authorize" })
  end
end
