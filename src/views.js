"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeEditPage = exports.generateLastEdited = exports.renderNotes = exports.redirectToHome = exports.generateNoteDOM = void 0;
var moment = require("moment");
var filters_1 = require("./filters");
var notes_1 = require("./notes");
//Geberate note DOM
var generateNoteDOM = function (note) {
    var noteEl = document.createElement("a");
    var textEl = document.createElement("p");
    var statusEl = document.createElement("p");
    //setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title;
    }
    else {
        textEl.textContent = "Un-Named Note";
    }
    textEl.classList.add("list-item__title");
    noteEl.appendChild(textEl);
    statusEl.textContent = generateLastEdited(note.updatedAt);
    statusEl.classList.add("list-item__subtitle");
    noteEl.appendChild(statusEl);
    noteEl.setAttribute("href", "/edit.html#".concat(note.id));
    noteEl.classList.add("list-item");
    return noteEl;
};
exports.generateNoteDOM = generateNoteDOM;
// Rendering notes to be displayed on the frontend.
var renderNotes = function () {
    var notesEl = document.querySelector("#notes");
    var filters = (0, filters_1.getFilters)();
    var notes = (0, notes_1.sortNotes)(filters.sortBy);
    var filteredNotes = notes.filter(function (note) { return note.title.toLowerCase().includes(filters.searchText.toLowerCase()); });
    notesEl.innerHTML = "";
    if (filteredNotes.length > 0) {
        filteredNotes.forEach(function (note) {
            var noteEl = generateNoteDOM(note);
            notesEl.appendChild(noteEl);
        });
    }
    else {
        var emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No notes to show!";
        emptyMessage.classList.add("empty-message");
        notesEl.appendChild(emptyMessage);
    }
};
exports.renderNotes = renderNotes;
var initializeEditPage = function (noteId) {
    var noteTitleEl = document.querySelector("#note-title");
    var noteBodyEl = document.querySelector("#note-body");
    var updatedTimeEl = document.querySelector("#updated-time");
    var notes = (0, notes_1.getNotes)();
    var note = notes.find(function (note) { return note.id === noteId; });
    if (!note) {
        redirectToHome();
    }
    noteTitleEl.value = note.title;
    noteBodyEl.value = note.body;
    updatedTimeEl.textContent = generateLastEdited(note.updatedAt);
};
exports.initializeEditPage = initializeEditPage;
//Used to redirect user to the home
var redirectToHome = function () {
    location.assign("/index.html");
};
exports.redirectToHome = redirectToHome;
//to generate last updated timestamp
var generateLastEdited = function (timestamp) { return "Last edited ".concat(moment(timestamp).fromNow()); };
exports.generateLastEdited = generateLastEdited;
//# sourceMappingURL=views.js.map