(function(window, document, undefined){
  document.addEventListener('DOMContentLoaded', initialize); 


  function initialize(){
    return;
    var flow = new Flow({

      target: 'http://104.131.165.106/flow',
      testChunks: false
    });

    flow.assignBrowse(document.getElementById('browse-button'));

    flow.on('filesSubmitted', function(){
      console.log('hi');
      flow.upload();
    });

    flow.on('fileProgress', function(e){
      console.log('progress', e); 
    });

    flow.on('fileSuccess', function(){
        console.log('success');
    });

    flow.on('fileError', function(e){
      console.log("error", e);
    });
  }

}(window, document))
