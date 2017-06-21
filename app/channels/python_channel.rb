class PythonChannel < ApplicationCable::Channel
  def subscribed
    stream_from "python_channel_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    ActionCable.server.broadcast "python_channel", message: data['message']
  end

  def parse(data)
    directory = "tmp/"
    parsed_code = data['code'].split("\n")
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

    ActionCable.server.broadcast "python_channel_#{data['username']}", type: "PARSE", output: @output
  end

end
