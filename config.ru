
require 'rubygems'
require 'haml'
require 'sinatra'
require 'sinatra/assetpack'
require 'sinatra/cross_origin'

set :root, File.dirname(__FILE__)
set :environment, :development

require './config/assets'
require './flow_app'
require './flow_ui'
require './flow_controller'




run Rack::URLMap.new(
  "/" => FlowUI.new,
  "/flow" => FlowApp.new,
)


