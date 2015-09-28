var Uploader = React.createClass({
  getInitialState: function(){
    return {files: {}};
  },


  componentDidMount: function(){
    this.bindFilePause();
    this.bindFilesSubmitted();
    this.bindFileProgress();
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



var UploadList = React.createClass({
  render: function(){
    var id, upload, UploadNodes = [];

    for(id in this.props.data) {
      upload = this.props.data[id];

      UploadNodes.push(
        <Upload id={upload.uniqueIdentifier} upload={upload}> 
          <UploadInfo upload={upload} />

          <ProgressBar progress={upload.progress()} />
        </Upload>
      );
    }

    return (
      <div className="uploader__uploads">
        {UploadNodes}
      </div>
    );
  }
});


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


var UploadToggleButton = React.createClass({
  buttonText: function(){
    var statusTexts = {
      uploading: 'Pause', 
      paused: 'Resume',
      inactive: ''
    };

    return statusTexts[this.props.status];
  },


  classString: function(){
    var base = 'btn btn-sm btn-secondary-outline',
        statusClasses;

    statusClasses = {
      uploading: base + ' btn-secondary-outline',
      paused: base + ' btn-success-outline',
      inactive: base + ' invisible'
    };

    return statusClasses[this.props.status];
  },

  render: function(){
    return (
      <button className={this.classString()} onClick={this.props.onClick} >
        {this.buttonText()}
      </button>
    );
  }
});


var Upload = React.createClass({
  render: function(){
    return (
      <div className="uploader__upload">
        {this.props.children}
      </div>    
    );
  }
});


var ProgressBar = React.createClass({
  render: function(){
    return (
      <progress className='progress progress-animated progress-striped' value={this.props.progress}>
      </progress>
    );
  }
});



var DropZone = React.createClass({
  componentDidMount: function(){
    var button = React.findDOMNode(this.refs.browseButton),
        dropzone = React.findDOMNode(this.refs.dropZone);

    this.props.flow.assignBrowse(button);
    this.props.flow.assignDrop(dropzone);
  },

  render: function(){
    return (
      <div className="dropzone" id="dropzone" ref="dropZone">
        <a ref='browseButton'>Browse for files </a>
        or drop some here.
      </div>
    );
  }
});


var data = [];


React.render(
  <Uploader flow={new Flow({target: 'http://104.131.165.106/flow', testChunks: false, simultaneousUploads: 1, method: 'octet'})}/>,

  document.getElementById('content')
);
