module EstatesHelper

  module ActionView
    module Helpers
      module FormHelper
        # Returns an input tag of the "text" type tailored for accessing a specified attribute (identified by +method+) and
        # that is populated with jQuery's autocomplete plugin.
        #
        # ==== Examples
        #   autocomplete_field(:post, :title, author_autocomplete_path, :size => 20)
        #   # => <input type="text" id="post_title" name="post[title]" size="20" value="#{@post.title}"  data-autocomplete="author/autocomplete"/>
        #
        def autocomplete_field(object_name, method, source, options ={})
          options["data-autocomplete"] = source
          text_field(object_name, method, rewrite_autocomplete_option(options))
        end
      end
    end
  end

end
