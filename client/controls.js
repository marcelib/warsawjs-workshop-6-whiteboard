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
  }
})

function switchCanvasDrawingMode(event) {
  Session.set("drawingMode", event.target.value)
}

function clearCanvas() {
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
