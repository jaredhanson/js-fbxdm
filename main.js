define(['exports',
        'querystring',
        './lib/guid',
        './lib/transports'],
function(exports, qs, guid, transports) {

  var actions = {}
    , callbacks = {}
    , forever = {};

  function create(config, cb) {
    cb = cb || function(){};
    
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
  
  function callback(id, handler, persistent) {
    if (typeof id == 'function') {
      handler = id;
      id = guid();
    }
    
    if (persistent) {
      forever[id] = true;
    }
    callbacks[id] = handler;
    return id;
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
    
    if (message.xd_action) {
      if (!origin) { return; }
      
      var handler = actions[message.xd_action];
      handler && handler();
      return;
    }
    
    if (message.cb) {
      var cb = callbacks[message.cb];
      if (!forever[message.cb]) {
        delete callbacks[message.cb];
      }
      cb && cb(message);
      return;
    }
  };
  
  exports.create = create;
  exports.action = action;
  exports.callback = callback;
  
});
