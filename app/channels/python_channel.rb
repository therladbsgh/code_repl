class PythonChannel < ApplicationCable::Channel

  def subscribed
    stream_from 'python'
  end

end
