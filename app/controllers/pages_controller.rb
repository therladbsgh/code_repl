class PagesController < ApplicationController

  def home
  end

  def testing
    directory = "/tmp/"
    parsed_code = params[:code].split("\n")
    File.open(File.join(directory, 'temp.py'), 'w') do |f|
      f.puts "import traceback"
      f.puts "try:"
      parsed_code.each do |line|
        f.puts "    " + line
      end
      f.puts "except Exception,e: print 'Error: ' + e.message"
    end
    @aa = `python /tmp/temp.py`
    msg = {output: @aa}
    render json: msg
  end

end
