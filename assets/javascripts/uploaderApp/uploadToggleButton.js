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
