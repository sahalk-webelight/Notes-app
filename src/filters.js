"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFilters = exports.getFilters = void 0;
var filters = {
    searchText: "",
    sortBy: "byEdited",
};
var getFilters = function () { return filters; };
exports.getFilters = getFilters;
var setFilters = function (updates) {
    if (typeof updates.searchText === "string") {
        filters.searchText = updates.searchText;
    }
    if (typeof updates.sortBy === "string") {
        filters.sortBy = updates.sortBy;
    }
};
exports.setFilters = setFilters;
//# sourceMappingURL=filters.js.map