class FlowApp < Sinatra::Base
  set :public_folder, "public"

  get "/" do 
    FlowController.new(params).get
  end

  post "/" do
    FlowController.new(params).post!
  end

end
