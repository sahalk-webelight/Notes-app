"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNote = exports.sortNotes = exports.removeNote = exports.createNote = exports.getNotes = void 0;
var uuid_1 = require("uuid");
var moment = require("moment");
var notes = [];
// Read existing notes form Local storage.
var loadNotes = function () {
    var notesJSON = localStorage.getItem("notes");
    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    }
    catch (e) {
        return [];
    }
};
// Exports notes from module
var getNotes = function () { return notes; };
exports.getNotes = getNotes;
// Creates a note
var createNote = function () {
    var id = (0, uuid_1.v4)();
    var createdAt = moment().valueOf();
    notes.push({
        title: "",
        body: "",
        id: id,
        createdAt: createdAt,
        updatedAt: createdAt,
    });
    saveNotes();
    return id;
};
exports.createNote = createNote;
//saving notes in local storage.
var saveNotes = function () {
    localStorage.setItem("notes", JSON.stringify(notes));
};
//Remove a note from the list
var removeNote = function (id) {
    var noteIndex = notes.findIndex(function (note) { return note.id === id; });
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        saveNotes();
    }
};
exports.removeNote = removeNote;
//Sorting the Notes
var sortNotes = function (sortBy) {
    if (sortBy === "byEdited") {
        return notes.sort(function (a, b) {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            }
            else if (a.updatedAt < b.updatedAt) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }
    else if (sortBy === "byCreated") {
        return notes.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
                return -1;
            }
            else if (a.createdAt < b.createdAt) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }
    else if (sortBy === "byAlpha") {
        return notes.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            }
            else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }
    else {
        return notes;
    }
};
exports.sortNotes = sortNotes;
// Updating the notes
var updateNote = function (id, updates) {
    var note = notes.find(function (note) { return note.id === id; });
    if (!note) {
        return;
    }
    if (typeof updates.title === "string") {
        note.title = updates.title;
        note.updatedAt = moment().valueOf();
    }
    if (typeof updates.body === "string") {
        note.body = updates.body;
        note.updatedAt = moment().valueOf();
    }
    saveNotes();
    return note;
};
exports.updateNote = updateNote;
notes = loadNotes();
//# sourceMappingURL=notes.js.map