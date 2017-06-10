class PagesController < ApplicationController

  def home
  end

  def testing
    directory = "/tmp/"
    File.open(File.join(directory, 'temp.py'), 'w') do |f|
      f.puts params[:session][:code]
    end
    @aa = `python /tmp/temp.py`
    puts @aa
  end

end
