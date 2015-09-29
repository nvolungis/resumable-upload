var Upload = React.createClass({
  render: function(){
    return (
      <div className="uploader__upload">
        {this.props.children}
      </div>
    );
  }
});
