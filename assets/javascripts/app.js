(function(window, document, undefined){
  document.addEventListener('DOMContentLoaded', initialize); 

  var files = new Files();

  function initialize(){
    var flow = new Flow({
      target: 'http://159.203.91.167/flow'
    });

    flow.assignBrowse(document.getElementById('browse-button'));

    flow.on('fileAdded', onFileAdded);
    flow.on('fileProgress', onFileProgress);
    flow.on('fileSuccess', onFileSuccess);
    flow.on('fileError', onFileError);
  }



  function onFileAdded(file){
    files.add(file)
  }

  function onFileProgress(file){
    console.log('fileProgress', arguments);
  }

  function onFileSuccess(file){
    console.log('fileSuccess', arguments);
  }

  function onFileError(){
    console.log('fileerror', arguments);
  }



  function Files(){
    var files = {};
  }

  Files.prototype = {
    add: function(flowfile){
      var file = new File(flowfile);
      files[flowfile.uniqueIdentifier] = file;
      file.render();
    },

    render: function(flowfile){
      var file = this.find(flowfile);
      file.render();
    },

    find: function(flowfile){
      return files[flowfile.uniqueIdentifier];
    }
  };


  function File(flowfile) {
    this.flowfile = flowfile; 
    this.$el = kj
  }

  File.prototype = {
     
  };


}(window, document))
