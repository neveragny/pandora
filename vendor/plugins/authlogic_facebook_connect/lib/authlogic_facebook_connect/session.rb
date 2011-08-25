module AuthlogicFacebookConnect
  module Session
    def self.included(klass)
      klass.class_eval do
        extend Config
        include Methods
      end
    end

    module Config
      # Should the user be saved with our without validations?
      #
      # The default behavior is to save the user without validations and then
      # in an application specific interface ask for the additional user
      # details to make the user valid as facebook just provides a facebook id.
      #
      # This is useful if you do want to turn on user validations, maybe if you
      # just have facebook connect as an additional authentication solution and
      # you already have valid users.
      #
      # * <tt>Default:</tt> true
      # * <tt>Accepts:</tt> Boolean
      def facebook_valid_user(value = nil)
        rw_config(:facebook_valid_user, value, false)
      end
      alias_method :facebook_valid_user=, :facebook_valid_user

      # What user field should be used for the facebook UID?
      #
      # This is useful if you want to use a single field for multiple types of
      # alternate user IDs, e.g. one that handles both OpenID identifiers and
      # facebook ids.
      #
      # * <tt>Default:</tt> :facebook_uid
      # * <tt>Accepts:</tt> Symbol
      def facebook_uid_field(value = nil)
        rw_config(:facebook_uid_field, value, :facebook_uid)
      end
      alias_method :facebook_uid_field=, :facebook_uid_field

      # What session key field should be used for the facebook session key
      #
      #
      # * <tt>Default:</tt> :facebook_session_key
      # * <tt>Accepts:</tt> Symbol
      def facebook_session_key_field(value = nil)
        rw_config(:facebook_session_key_field, value, :facebook_session_key)
      end
      alias_method :facebook_session_key_field=, :facebook_session_key_field

      # Class representing facebook users we want to authenticate against
      #
      # * <tt>Default:</tt> klass
      # * <tt>Accepts:</tt> Class
      def facebook_user_class(value = nil)
        rw_config(:facebook_user_class, value, klass)
      end
      alias_method :facebook_user_class=, :facebook_user_class

      # Should a new user creation be skipped if there is no user with given facebook uid?
      #
      # The default behavior is not to skip (hence create new user). You may want to turn it on
      # if you want to try with different model.
      #
      # * <tt>Default:</tt> false
      # * <tt>Accepts:</tt> Boolean
      def facebook_skip_new_user_creation(value = nil)
        rw_config(:facebook_skip_new_user_creation, value, false)
      end
      alias_method :facebook_skip_new_user_creation=, :facebook_skip_new_user_creation
    end

    module Methods
      def self.included(klass)
        klass.class_eval do
          validate :validate_by_facebook_connect, :if => :authenticating_with_facebook_connect?
        end

        def credentials=(value)
          # TODO: Is there a nicer way to tell Authlogic that we don't have any credentials than this?
          values = [:facebook_connect]
          super
        end
      end

      def associate_with_facebook_connect
        facebook_session = controller.current_facebook_user.fetch
        self.attempted_record = controller.current_user

        if self.attempted_record
          self.attempted_record.send(:"#{facebook_uid_field}=", facebook_session.id)
          self.attempted_record.send(:"#{facebook_session_key_field}=", facebook_session.client.access_token)
          self.attempted_record.save
        end
      end

      def validate_by_facebook_connect
        facebook_session = controller.current_facebook_user.fetch
        # Find a user who has already connected with facebook
        self.attempted_record = facebook_user_class.find(:first, :conditions => { facebook_uid_field => facebook_session.id })

        # If we have a user who already connected with facebook
        if self.attempted_record
          # Update the access token and save
          self.attempted_record.send(:"#{facebook_session_key_field}=", facebook_session.client.access_token)
          self.attempted_record.save
        elsif facebook_user_class.find(:first, :conditions => { :email => facebook_session.email })
          errors.add(:facebook, "facebook")
        end

        # if we dont have an already connected user or we were not told to not create new users
        unless self.attempted_record || facebook_skip_new_user_creation || errors.on(:facebook)
          begin
            # Get the user from facebook and create a local user.
            #
            # We assign it after the call to new in case the attribute is protected.

            new_user = klass.new

            if klass == facebook_user_class
              # Set the facebook fields on the new record
              new_user.send(:"#{facebook_uid_field}=", facebook_session.id)
              new_user.send(:"#{facebook_session_key_field}=", facebook_session.client.access_token)
            else
              new_user.send(:"build_#{facebook_user_class.to_s.underscore}", :"#{facebook_uid_field}" => facebook_session.id, :"#{facebook_session_key_field}" => facebook_session.client.access_token)
            end

            # Call our before connect hook if it exists in the model
            new_user.before_connect(facebook_session) if new_user.respond_to?(:before_connect)

            self.attempted_record = new_user

            # If the user should be a valid user for the model
            if facebook_valid_user
              # If the user is not valid throw an error
              unless self.attempted_record.valid?
                errors.add_to_base(
                  I18n.t('error_messages.facebook_user_creation_failed',
                         :default => 'There was a problem creating a new user ' +
                                     'for your Facebook account'))
              end

              self.attempted_record = nil
            else
              self.attempted_record.save_with_validation(false)
            end
          rescue Exception => e
            debugger
            errors.add_to_base(I18n.t('error_messages.facebooker_session_expired',
              :default => "Your Facebook Connect session has expired, please reconnect."))
          end
        end
      end

      def authenticating_with_facebook_connect?
        attempted_record.nil? && errors.empty? && controller.current_facebook_user
      end

      def associatable_with_facebook_connect?
        !controller.current_user.facebook_uid
      end

      private
      def facebook_valid_user
        self.class.facebook_valid_user
      end

      def facebook_uid_field
        self.class.facebook_uid_field
      end

      def facebook_session_key_field
        self.class.facebook_session_key_field
      end

      def facebook_user_class
        self.class.facebook_user_class
      end

      def facebook_skip_new_user_creation
        self.class.facebook_skip_new_user_creation
      end
    end
  end
end
