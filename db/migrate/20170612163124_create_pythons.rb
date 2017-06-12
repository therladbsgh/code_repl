class CreatePythons < ActiveRecord::Migration[5.0]
  def change
    create_table :pythons do |t|

      t.string :title
      t.string :description
      t.string :start_code
      t.string :checker

      t.timestamps
    end
  end
end
