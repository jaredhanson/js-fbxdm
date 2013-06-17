define(['exports', 'postmessage'],
function(exports, pm) {
  
  function isAvailable() {
    return !!window.postMessage;
  }
  
  function init(config, onMessage, cb) {
    console.log('postmessage.init');
    
    var prefix = '_FB_' + config.channel;
    console.log('prefix: ' + prefix);
    
    listener = pm.createListener(function(data, origin, source) {
      console.log('*** GOT MESSAGE: ');
      console.log(data);
      console.log('ORIGIN: ' + origin);
      //console.log('SOURCE: ' + source);
      
      
      var message = data;
      if (typeof message != 'string') {
        return;
      }
      
      if (message.substring(0, prefix.length) == prefix) {
        message = message.substring(prefix.length);
        onMessage(message, origin);
      }
    });
    listener.listen();
    
    setTimeout(function() {
      cb();
    }, 0);
  }
  
  exports.isAvailable = isAvailable;
  exports.init = init;
  
});
