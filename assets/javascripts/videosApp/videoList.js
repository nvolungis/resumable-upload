var VideoList = React.createClass({
  render: function(){
    var videoNodes = this.props.videos.map(function(video){
      return (
        <Video>{video}</Video>
      );
    });

    return (
      <div className="video-list">
        {videoNodes}
      </div>
    );
  }
});
