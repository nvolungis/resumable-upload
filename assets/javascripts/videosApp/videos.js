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

