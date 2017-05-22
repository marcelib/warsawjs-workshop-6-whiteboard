import {
  Session
} from 'meteor/session'

Template.controls.events({
  "change .modeSelector": function(event) {
    switchCanvasDrawingMode(event)
  },
  "click #clearCanvas": function(event) {
    clearCanvas()
  },
  "input #brushSize": function(event) {
    changeBrushSize(event)
  },
  "change #brushColor": function(event) {
    changeBrushColor(event)
  },
  "keypress #whiteboardName": function(event) {
    console.log("EEE")
    if (event.key === 'Enter') {
      console.log('do validate');
      changeWhiteboardName(event)
    }
  }
})

function switchCanvasDrawingMode(event) {
  Session.set("editingMode", event.target.value)
}

function clearCanvas() {
  Meteor.call("clearCanvas", Session.get("sessionId"))
  Session.set("clearTrigger", true)
}

function changeBrushSize(event) {
  var brushSize = event.target.value;
  Session.set("brushSize", brushSize);
}

function changeBrushColor(event) {
  var brushColor = event.target.value;
  Session.set("brushColor", brushColor);
}

function changeWhiteboardName(event) {
  Whiteboards.update(Session.get("sessionId"), {
    name: event.target.value
  })
}

Template.controls.helpers({
  brushSize: function() {
    return Session.get('brushSize')
  },
  brushColor: function() {
    if (Session.get('brushColor') === "rgb(0, 0, 0)") {
      return "#000000"
    }
    return Session.get('brushColor')
  }
})
