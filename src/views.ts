import * as moment from "moment"
import { getFilters } from "./filters"
import { getNotes, sortNotes } from "./notes"

//Geberate note DOM
const generateNoteDOM = (note) => {
	const noteEl = document.createElement("a")
	const textEl = document.createElement("p")
	const statusEl = document.createElement("p")

	//setup the note title text
	if (note.title.length > 0) {
		textEl.textContent = note.title
	} else {
		textEl.textContent = "Un-Named Note"
	}
	textEl.classList.add("list-item__title")
	noteEl.appendChild(textEl)

	statusEl.textContent = generateLastEdited(note.updatedAt)
	statusEl.classList.add("list-item__subtitle")
	noteEl.appendChild(statusEl)

	noteEl.setAttribute("href", `/edit.html#${note.id}`)
	noteEl.classList.add("list-item")
	return noteEl
}

// Rendering notes to be displayed on the frontend.
const renderNotes = () => {
	let notesEl = document.querySelector("#notes")

	const filters = getFilters()
	const notes = sortNotes(filters.sortBy)
	const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

	notesEl.innerHTML = ""

	if (filteredNotes.length > 0) {
		filteredNotes.forEach((note) => {
			const noteEl = generateNoteDOM(note)
			notesEl.appendChild(noteEl)
		})
	} else {
		const emptyMessage = document.createElement("p")
		emptyMessage.textContent = "No notes to show!"
		emptyMessage.classList.add("empty-message")
		notesEl.appendChild(emptyMessage)
	}
}

const initializeEditPage = (noteId) => {
	const noteTitleEl = <HTMLInputElement>document.querySelector("#note-title")
	const noteBodyEl = <HTMLInputElement>document.querySelector("#note-body")
	const updatedTimeEl = <HTMLInputElement>document.querySelector("#updated-time")
	const notes = getNotes()
	const note = notes.find((note) => note.id === noteId)

	if (!note) {
		redirectToHome()
	}

	noteTitleEl.value = note.title
	noteBodyEl.value = note.body
	updatedTimeEl.textContent = generateLastEdited(note.updatedAt)
}

//Used to redirect user to the home
const redirectToHome = () => {
	location.assign("/index.html")
}

//to generate last updated timestamp
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`

export { generateNoteDOM, redirectToHome, renderNotes, generateLastEdited, initializeEditPage }
