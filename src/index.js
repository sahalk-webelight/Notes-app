"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notes_1 = require("./notes");
var filters_1 = require("./filters");
var views_1 = require("./views");
(0, views_1.renderNotes)();
//Event Handling for Create Note Button.
document.querySelector("#create-note").addEventListener("click", function (e) {
    var id = (0, notes_1.createNote)();
    location.assign("/edit.html#".concat(id));
});
//Event handling for Search/filter notes input
document.querySelector("#search-text").addEventListener("input", function (e) {
    (0, filters_1.setFilters)({
        searchText: e.target.value,
    });
    (0, views_1.renderNotes)();
});
document.querySelector("#filter-by").addEventListener("change", function (e) {
    (0, filters_1.setFilters)({
        sortBy: e.target.value,
    });
    (0, views_1.renderNotes)();
});
window.addEventListener("storage", function (e) {
    if (e.key === "notes") {
        (0, views_1.renderNotes)();
    }
});
//# sourceMappingURL=index.js.map