module AssetConfig
  def asset_config
    register Sinatra::AssetPack
    set :public_folder, 'public'

    assets do
      serve '/js', from: 'assets/javascripts'
      serve '/css', from: 'assets/stylesheets'

      css :application, [
        '/css/layout.css',
        '/css/dropzone.css',
        '/css/bootstrap.css'
      ]

      css_compression :sass
    end
  end
end
