class AddSlugToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :friendly_name, :string
    add_column :posts, :slug, :string

    add_index :posts, :friendly_name, unique: true
    add_index :posts, :slug, unique: true
  end
end
