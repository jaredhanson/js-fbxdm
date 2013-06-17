define(['exports',
        './lib/transports'],
function(exports, transports) {

  var onMessage = function(){};

  function handler(fn) {
    onMessage = fn;
  }

  function create(config, cb) {
    cb = cb || function(){};
    
    console.log('fbxdm.create');
    console.log(config);
    
    var name = transports.find()
      , transport = transports.get(name);
    if (transport) {
      transport.init(config, onMessage, cb);
      return name;
    }
  }
  
  exports.handler = handler;
  exports.create = create;
  
});
