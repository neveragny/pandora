class CreateRenterfavorites < ActiveRecord::Migration
  def self.up
    create_table :rentfavorites do |t|
      t.integer :user_id
      t.string :rent_id
      t.timestamps
    end
  end

  def self.down
    drop_table :rentfavorites
  end
end
