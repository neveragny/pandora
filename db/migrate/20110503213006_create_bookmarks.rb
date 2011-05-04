class CreateBookmarks < ActiveRecord::Migration
  def self.up
    create_table :bookmarks do |t|
      t.string :type, :null => false
      t.string :ref_id, :null => false
      t.timestamps
    end
  end

  def self.down
    drop_table :bookmarks
  end
end
