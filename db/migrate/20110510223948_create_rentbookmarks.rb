class CreateRentbookmarks < ActiveRecord::Migration
  def self.up
    create_table :rentbookmarks do |t|
      t.integer :user_id, :nil => false
      t.integer :rent_id, :nil => false
      t.timestamps
    end
  end

  def self.down
    drop_table :rentbookmarks
  end
end
