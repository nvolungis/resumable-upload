var Videos = React.createClass({

  getInitialState: function(){
    return {videos:[]};
  },

  bindWindowEvents: function(){
    $(window).on('file:uploaded', this.loadVideosFromServer.bind(this));
  },

  loadVideosFromServer: function(){
    var vids;

    $.get(this.props.url + "/files" ,function(resp){
      vids = resp.map(function(vid){
        return this.props.url + "/" + vid;
      }.bind(this))

      this.setState({videos: vids});
    }.bind(this));
  },

  componentDidMount: function(){
    this.loadVideosFromServer();
    this.bindWindowEvents();
  },

  render: function(){
    return (
      <VideoList videos={this.state.videos} />
    );
  }
});


var VideoList = React.createClass({
  render: function(){
    var videoNodes = this.props.videos.map(function(video){
      return (
        <Video>{video}</Video>
      );
    });

    console.log(videoNodes);

    return (
      <div className="video-list">
        {videoNodes}
      </div>
    );
  }
});


var Video = React.createClass({
  render: function(){
    return (
      <video autoPlay="true" width="20%">
        <source type="video/mp4" src={this.props.children} />
      </video> 
    );
  }
});

React.render(
  <Videos url="http://104.131.165.106" />,
  document.getElementById('videos')
);



