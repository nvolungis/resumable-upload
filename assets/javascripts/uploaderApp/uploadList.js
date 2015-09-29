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
