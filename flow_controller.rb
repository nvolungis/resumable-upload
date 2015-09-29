require 'json'

class FlowController
  def initialize(params)
    @params = params
  end

  def get
    File.exists?(chunk_file_path) ? 200 : 204
  end

  def post!
    save_file!
    200
  end

  def files
    Dir[File.join('public', 'final', '*')].map do |file| 
      File.join(file.split("/").drop(1))
    end.to_json
  end

  private

  def save_file!
    FileUtils.mkpath final_file_directory
    FileUtils.mv @params["path"], final_file_path
  end

  def final_file_path
    File.join final_file_directory, @params[:flowFilename]
  end

  def final_file_directory
    File.join('public', 'final')
  end
end
