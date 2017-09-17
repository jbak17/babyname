console.log("Websocket script was loaded")

window.received = []

window.websocket = new WebSocket("ws://#{window.location.host}/websocket");

window.websocket.onmessage = (msg) ->
  console.log("Received a message over the websocket:")
  console.log(msg)
  console.log("---")

# Called when the connection to the server is opened.
window.websocket.onopen =  () ->
  console.log("Connection with server open.");

window.websocket.send = (msg) ->
  JSON.stringify(msg)
