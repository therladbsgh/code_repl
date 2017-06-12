require 'open3'

class PagesController < ApplicationController

  def home
  end

  def tutorial
    number = params[:id]
    @py = Python.find_by_id(params[:num])
    if @py.nil?
      redirect_to '/404'
    end
  end

  def testing
    directory = "tmp/"
    parsed_code = params[:code].split("\n")
    File.open(File.join(directory, 'temp.py'), 'w') do |f|
      parsed_code.each do |line|
        f.puts line
      end
    end

    stdout, stderr, status = Open3.capture3("python -m py_compile tmp/temp.py")
    if stderr.length > 0
      @output = stderr
    else
      stdout, stderr, status = Open3.capture3("python tmp/temp.py")
      if stderr.length > 0
        @output = stderr
      else
        @output = `python tmp/temp.py`
      end
    end
    msg = {output: @output}
    render json: msg
  end

end
