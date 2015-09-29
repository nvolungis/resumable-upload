require 'json'

class FlowUI < Sinatra::Base
  register Sinatra::CrossOrigin
  extend AssetConfig
  asset_config 

  get "/" do
    haml :index 
  end

  get "/files" do
    cross_origin
    content_type :json
    FlowController.new(params).files 
  end
end
