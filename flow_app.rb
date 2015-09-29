class FlowApp < Sinatra::Base
  register Sinatra::CrossOrigin
  set :public_folder, "public"
  
  before do
    if request.request_method == 'OPTIONS'
      cross_origin
      halt 200
    end
  end

  get "/" do 
    cross_origin
    FlowController.new(params).get
  end

  post "/" do
    cross_origin
    FlowController.new(params).post!
  end

end
