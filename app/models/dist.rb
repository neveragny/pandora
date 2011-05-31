class Dist < ActiveRecord::Base
  establish_connection :rents

  def name_initial
    "#{dist_name}"
  end
end
