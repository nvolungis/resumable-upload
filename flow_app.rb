class FlowApp < Sinatra::Base

  get "/" do 
    FlowController.new(params).get
  end

  post "/" do
    FlowController.new(params).post!
  end

end
