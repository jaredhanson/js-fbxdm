define(['exports',
        './transports/postmessage'],
function(exports, postmessage) {
  
  var transports = {}
    , order = [];
  
  exports.find = function() {
    var list = order
      , i = list.length;
    while (i--) {
      var name = list[i],
          transport = transports[name];
      if (transport.isAvailable()) {
        return name;
      }
    }
  }
  
  exports.get = function(name) {
    return transports[name];
  }
  
  function register(name, provider) {
    order.push(name);
    transports[name] = provider;
  }
  
  register('postmessage', postmessage);
  
});
