import {
  Session
} from 'meteor/session'
import {
  Tracker
} from 'meteor/tracker'
import {
  Random
} from "meteor/random"
Template.canvas.onRendered(function() {

  var canvas = new fabric.Canvas('whiteboard', {
    selection: false,
    isDrawingMode: false,
    renderOnAddOrRemove: true
  });

  canvas.on('object:added', function(event) {

    var object = event.target
    if (object._id) {
      return
    }
    var doc = object.toObject()
    doc._id = Random.id()
    Objects.insert(doc)
  })

  Objects.find().observeChanges({
    added: function(id, object) {

      fabric.util.enlivenObjects([object], function([object]) {
        object._id = id;
        canvas.add(object);
      });
    }
  })


  Session.set("drawingMode", "selectionMode");
  Session.set("clearTrigger", false);
  Session.set("brushSize", 10);
  Session.set("brushColor", canvas.freeDrawingBrush.color);

  Tracker.autorun(function() {
    var drawingMode = Session.get("drawingMode");
    console.log(drawingMode)
    if (drawingMode === "drawingMode") {
      canvas.isDrawingMode = true
    }
    if (drawingMode === "selectionMode") {
      canvas.isDrawingMode = false
    }
    canvas.forEachObject(function(obj) {
      obj.selectable = false;
    })
  });

  Tracker.autorun(function() {
    var clearTrigger = Session.get("clearTrigger");
    if (clearTrigger) {
      canvas.clear();
      canvas.renderAll();
      Session.set("clearTrigger", false);
    }
  });

  Tracker.autorun(function() {
    var brushSize = Session.get("brushSize");
    canvas.freeDrawingBrush.width = parseInt(brushSize);
  });

  Tracker.autorun(function() {
    var brushColor = Session.get("brushColor");
    canvas.freeDrawingBrush.color = brushColor ? brushColor : "#000000";
  });
});

fabric.Canvas.prototype.getObjectById = function(id) {
  return this.getObjects().find(function(object) {
    return object._id == id;
  })
}
