# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Licemerov::Application.initialize!

Dir[File.join(Rails.root, 'lib', 'patches', '**', '*.rb')].sort.each { |patch| require(patch) }

