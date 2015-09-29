var UploadInfo = React.createClass({
  timeRemaining: function(){
    var remaining = this.props.upload.timeRemaining();
    if(this.isPaused()) return " - " + 'Paused';
    if(remaining == 'Infinity') return "";
    if((remaining / 60) == 0) return "";
    return " - " + (remaining / 60).toFixed(2) + " mins remaining";
  },


  isPaused: function(){
    var upload = this.props.upload,
        isPaused = false;

    return upload.progress() != 0 && !upload.isComplete() && !upload.isUploading();
  },


  status: function(){
    if(this.isPaused()){
      return 'paused';
    }

    if(this.props.upload.isUploading()){
      return 'uploading';
    }

    return 'inactive';
  },


  handleToggleClick: function(){
    if(this.status() == 'uploading'){
      this.props.upload.pause();
    }else{
      this.props.upload.resume();
    }
  },


  render: function(){
    var upload = this.props.upload;

    return (
      <div className="uploader__upload__info-bar">
        <div className="pull-left uploader__upload__info-bar-left">
          <span className="uploader__upload__title">{upload.name}</span>
          <span className="uploader__upload__time-remaining">{this.timeRemaining()}</span>
        </div>
        <div className="pull-right">
          <UploadToggleButton upload={upload} onClick={this.handleToggleClick} status={this.status()} />
        </div>
      </div>
    );
  }
});
