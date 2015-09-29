var Uploader = React.createClass({
  getInitialState: function(){
    return {files: {}};
  },


  componentDidMount: function(){
    this.bindFilePause();
    this.bindFilesSubmitted();
    this.bindFileProgress();
    this.bindFileSuccess();
  },


  bindFilesSubmitted: function(){
    this.props.flow.on('filesSubmitted', function(flowfiles){
      var files = this.state.files;

      flowfiles.forEach(function(flowfile){
        files[flowfile.uniqueIdentifier] = flowfile;
        this.setState({files:files});
      }.bind(this));

      this.props.flow.upload();
    }.bind(this))
  },


  bindFileProgress: function(){
    this.props.flow.on('fileProgress', function(file, chunk){
      var files = this.state.files;

      files[file.uniqueIdentifier] = file;
      this.setState(files);
    }.bind(this));
  },


  bindFileSuccess: function(){
    this.props.flow.on('fileSuccess', function(){
      $(window).trigger('file:uploaded');
    }.bind(this));
  },


  bindFilePause: function(){
    this.props.flow.on('filePaused',function(file){
      var files = this.state.files;

      files[file.uniqueIdentifier] = file;
      this.setState(files);
    }.bind(this));
  },


  render: function(){
    return (
      <div className="uploader">
        <UploadList data={this.state.files} flow={this.props.flow} />
        <DropZone flow={this.props.flow} />
      </div>
    );
  }
});
