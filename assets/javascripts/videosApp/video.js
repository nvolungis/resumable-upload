var Video = React.createClass({
  render: function(){
    return (
      <video autoPlay="true" width="20%">
        <source type="video/mp4" src={this.props.children} />
      </video> 
    );
  }
});
