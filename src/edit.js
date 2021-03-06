"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views_1 = require("./views");
var notes_1 = require("./notes");
var noteTitleEl = document.querySelector("#note-title");
var noteBodyEl = document.querySelector("#note-body");
var updatedTimeEl = document.querySelector("#updated-time");
var removeNoteBtn = document.querySelector("#remove-note");
var noteId = location.hash.substring(1);
(0, views_1.initializeEditPage)(noteId);
noteTitleEl.addEventListener("input", function (e) {
    var note = (0, notes_1.updateNote)(noteId, {
        title: e.target.value.trim(),
    });
    updatedTimeEl.textContent = (0, views_1.generateLastEdited)(note.updatedAt);
});
noteBodyEl.addEventListener("input", function (e) {
    var note = (0, notes_1.updateNote)(noteId, {
        body: e.target.value,
    });
    updatedTimeEl.textContent = (0, views_1.generateLastEdited)(note.updatedAt);
});
removeNoteBtn.addEventListener("click", function (e) {
    var modal = document.querySelector("#myModal");
    modal.style.display = "block";
    var alertText = "Are you sure want to remove note ?";
    var alertYes = document.querySelector("#alert-yes-btn");
    var alertCancel = document.querySelector("#alert-cancel-btn");
    alertYes.addEventListener("click", function (e) {
        (0, notes_1.removeNote)(noteId);
        (0, views_1.redirectToHome)();
    });
    alertCancel.addEventListener("click", function (e) {
        modal.style.display = "none";
    });
    // if (confirm(alertText) == true) {
    // 	removeNote(noteId)
    // 	redirectToHome()
    // }
});
window.addEventListener("storage", function (e) {
    if (e.key === "notes") {
        (0, views_1.initializeEditPage)(noteId);
    }
});
//# sourceMappingURL=edit.js.map