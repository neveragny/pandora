module AuthlogicFacebookConnect
  module Helper
    def authlogic_facebook_login_button(options = {})
      options[:controller] ||= "user_session"
      options[:onlogin] = "connect_to_facebook();"
      
      output = "<form id='connect_to_facebook_form' method='post' action='/#{options[:controller]}'>\n"
      output << "<input type='hidden' name='authenticity_token' value='#{form_authenticity_token}'/>\n"
      output << "</form>\n"
      output << "<script type='text/javascript' charset='utf-8'>\n"
      output << " function connect_to_facebook() {\n"
      output << "   document.getElementById('connect_to_facebook_form').submit();\n"
      output << " }\n"
      output << "</script>\n"
      options.delete(:controller)
      output << '<fb:login-button show-faces="false" width="200" max-rows="1"></fb:login-button>'
      output
    end
  end
end
