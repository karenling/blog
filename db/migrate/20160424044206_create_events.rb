class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :user_id
      t.string :session_id, default: ''
      t.text :request_url, default: ''
      t.text :referrer_url, default: ''
      t.text :request_user_agent, default: ''

      t.timestamps
    end
  end
end
