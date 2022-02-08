import { initializeEditPage, redirectToHome, generateLastEdited } from "./views"
import { updateNote, removeNote } from "./notes"

const noteTitleEl = document.querySelector("#note-title")
const noteBodyEl = document.querySelector("#note-body")
const updatedTimeEl = document.querySelector("#updated-time")
const removeNoteBtn = document.querySelector("#remove-note")
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

type HTMLElementEvent<T extends HTMLElement> = Event & {
	target: T
}

noteTitleEl.addEventListener("input", (e: HTMLElementEvent<HTMLInputElement>) => {
	const note = updateNote(noteId, {
		title: e.target.value,
	})

	updatedTimeEl.textContent = generateLastEdited(note.updatedAt)
})

noteBodyEl.addEventListener("input", (e: HTMLElementEvent<HTMLInputElement>) => {
	const note = updateNote(noteId, {
		body: e.target.value,
	})
	updatedTimeEl.textContent = generateLastEdited(note.updatedAt)
})

removeNoteBtn.addEventListener("click", (e) => {
	removeNote(noteId)
	redirectToHome()
})

window.addEventListener("storage", (e) => {
	if (e.key === "notes") {
		initializeEditPage(noteId)
	}
})
