function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

App.python = App.cable.subscriptions.create({ channel: "PythonChannel", room: getCookie("username") }, {

  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    // Called when there's incoming data on the websocket for this channel
    if (data['type'] === "PARSE") {
      printPythonOutput(data['output']);
    } else {
      return alert(data['message']);
    }
  },

  speak: function(message) {
    return this.perform('speak', {message: message});
  },

  parse: function(username, code) {
    return this.perform('parse', {username: username, code: code});
  }

});
