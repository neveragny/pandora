class CreateRentphotos < ActiveRecord::Migration
  def self.up
    create_table :rentphotos do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :rentphotos
  end
end
