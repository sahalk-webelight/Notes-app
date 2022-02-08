import { createNote } from "./notes"
import { setFilters } from "./filters"
import { renderNotes } from "./views"

renderNotes()

type HTMLElementEvent<T extends HTMLElement> = Event & {
	target: T
}

//Event Handling for Create Note Button.
document.querySelector("#create-note").addEventListener("click", (e: HTMLElementEvent<HTMLButtonElement>) => {
	const id = createNote()
	location.assign(`/edit.html#${id}`)
})

//Event handling for Search/filter notes input
document.querySelector("#search-text").addEventListener("input", (e: HTMLElementEvent<HTMLInputElement>) => {
	setFilters({
		searchText: e.target.value,
	})
	renderNotes()
})

document.querySelector("#filter-by").addEventListener("change", (e: HTMLElementEvent<HTMLInputElement>) => {
	setFilters({
		sortBy: e.target.value,
	})
	renderNotes()
})

window.addEventListener("storage", (e) => {
	if (e.key === "notes") {
		renderNotes()
	}
})
