class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.string :body, null: false
      t.integer :status, null: false, default: 0
      t.datetime :post_date, null: false
      t.references :user

      t.timestamps
    end
  end
end
