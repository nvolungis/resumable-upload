require 'rubygems'
require 'sinatra'
require 'sinatra/assetpack'
require 'Haml'

set :root, File.dirname(__FILE__)

require './config/assets'
require './flow_app'
require './flow_ui'
require './flow_controller'


run Rack::URLMap.new(
  "/" => FlowUI.new,
  "/flow" => FlowApp.new,
)


