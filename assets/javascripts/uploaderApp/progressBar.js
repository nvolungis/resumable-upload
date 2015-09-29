var ProgressBar = React.createClass({
  render: function(){
    return (
      <progress className='progress progress-animated progress-striped' value={this.props.progress}>
      </progress>
    );
  }
});
