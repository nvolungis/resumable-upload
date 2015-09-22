class FlowUI < Sinatra::Base
  extend AssetConfig
  asset_config 

  get "/" do
    haml :index 
  end
end
