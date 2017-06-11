class PagesController < ApplicationController

  def home
  end

  def testing
    directory = "/tmp/"
    File.open(File.join(directory, 'temp.py'), 'w') do |f|
      f.puts "import traceback"
      f.puts "try:"
      f.puts "    " + params[:code]
      f.puts "except Exception,e: print 'Error: ' + e.message"
    end
    @aa = `python /tmp/temp.py`
    puts @aa
    msg = {output: @aa}
    render json: msg
  end

end
