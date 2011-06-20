class Street < ActiveRecord::Base
  establish_connection :rents

  scope :autocomplete_rus, lambda {|term|
    find_by_sql("select rus_name from streets where rus_name LIKE '%#{term}%'") }

  scope :autocomplete_ukr, lambda {|term|
    find_by_sql "select ukr_name from streets where rus_name LIKE '%#{term}%'" }

end
