class AddUserIdAndCityToRents < ActiveRecord::Migration

  def self.connection
    Rent.connection
  end

  def self.change
    add_column :rents, :user_id, :integer, :default => 0
    add_column :rents, :city, :string
  end

  def self.down
    remove_column :rents, :user_id
    remove_column :rents, :city
  end
end