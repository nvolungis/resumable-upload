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
