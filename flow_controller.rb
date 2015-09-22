class FlowController
  def initialize(params)
    @params = params
  end


  def get
    File.exists?(chunk_file_path) ? 200 : 204
  end


  def post!
    sleep 1
    save_file!
    combine_file! if last_chunk?
    200
  end


  private


  def last_chunk?
    @params[:flowChunkNumber].to_i == @params[:flowTotalChunks].to_i
  end


  def save_file!
    FileUtils.mkpath chunk_file_directory
    FileUtils.mv @params["file"][:tempfile], chunk_file_path
  end


  def chunk_file_path
    chunk_file_directory
    File.join(chunk_file_directory, "#{@params[:flowFilename]}.part#{@params[:flowChunkNumber]}")
  end


  def chunk_file_directory
    File.join("tmp", "flow", @params[:flowIdentifier])
  end


  def combine_file!
    FileUtils.mkpath final_file_directory

    File.open(final_file_path, "a") do |f|
      file_chunks.each do |file_chunk_path|
        f.write File.read(file_chunk_path)
      end
    end


    FileUtils.rm_rf chunk_file_directory
  end


  def final_file_directory
    File.join("final")
  end


  def final_file_path
    File.join final_file_directory, @params[:flowFilename]
  end


  def file_chunks
    Dir["#{chunk_file_directory}/*.part*"].sort_by {|f| f.split(".part")[1].to_i}
  end
end
