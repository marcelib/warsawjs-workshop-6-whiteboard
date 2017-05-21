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
    doc.sessionId = Session.get("sessionId")
    Objects.insert(doc)
    canvas.remove(object)
  });

  canvas.on('object:modified', function(event) {
    var doc = event.target.toObject()
    Objects.update(event.target._id, {
      $set: doc
    })
  });

  Objects.find().observeChanges({
    added: function(id, object) {
      if (object.sessionId != Session.get("sessionId")) {
        return
      }
      fabric.util.enlivenObjects([object], function([object]) {
        object._id = id;
        canvas.add(object);
      });
    },
    changed: function(id, changed) {
      var object = canvas.getObjectById(id);
      object.set(changed);
      canvas.renderAll();
    },
    removed: function(id) {
      canvas.forEachObject(function(object) {
        if (object._id === id) {
          canvas.remove(object)
          return
        }
      })
    }
  })

  Session.set("drawingMode", "selectionMode");
  Session.set("clearTrigger", false);
  Session.set("brushSize", 10);
  Session.set("brushColor", canvas.freeDrawingBrush.color);

  Tracker.autorun(function() {
    var canvas = fabric.Canvas.activeInstance;
    canvas.__eventListeners["mouse:down"] = [];

    var drawingMode = Session.get("editingMode");
    if (drawingMode == "drawingMode") {
      canvas.isDrawingMode = true
    }
    if (drawingMode == "selectionMode") {
      canvas.isDrawingMode = false
    }
    if (drawingMode == "removalMode") {
      canvas.isDrawingMode = false
      canvas.on('mouse:down', function(event) {
        var object = event.target;
        Objects.remove(object._id)
        canvas.remove(object)
        return false;
      });
    }
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
