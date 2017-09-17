console.log("Websocket script was loaded")

window.received = []

websocket = new WebSocket("ws://#{window.location.host}/websocket");

websocket.onmessage = (msg) ->
  window.received = [] #clear window
  console.log("Received a message over the websocket:")
  console.log(msg)
  console.log("---")
  json = JSON.parse(msg.data)
  locs = json.map (muppet) -> muppet.location
  window.received.push(locs)
  rerender()

# Called when the connection to the server is opened.
websocket.onopen =  () ->
#  alert("Connection with server open.");

#websocket.send = (msg) ->
#  JSON.stringify(msg)
