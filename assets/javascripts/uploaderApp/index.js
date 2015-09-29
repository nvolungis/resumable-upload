var flow = new Flow({
  target: 'http://104.131.165.106/flow',
  testChunks: false,
  simultaneousUploads: 1,
  method: 'octet',
  flowChunkSize: 2048000
});


React.render(
  <Uploader flow={flow} />,
  document.getElementById('content')
);
