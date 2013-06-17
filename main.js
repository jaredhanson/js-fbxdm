define(['exports',
        'querystring',
        './lib/transports'],
function(exports, qs, transports) {

  var actions = {};

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

  function action(name, handler) {
    actions[name] = handler;
  }
  
  function onMessage(message, origin) {
    // TODO: Check origin
    
    if (typeof message == 'string') {
      // TODO: handle FB_RPC
      
      if (message.substring(0, 1) == '{') {
        try {
          message = JSON.parse(message);
        } catch (_) {
          return;
        }
      } else {
        message = qs.parse(message);
      }
    }
    
    console.log('!! ON MESSAGE');
    console.log(message);
    
    if (message.xd_action) {
      if (!origin) { return; }
      
      var handler = actions[message.xd_action];
      handler && handler(message);
    }
  };
  
  exports.create = create;
  exports.action = action;
  
});
