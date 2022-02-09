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
		title: e.target.value.trim(),
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
	const modal = <HTMLElement>document.querySelector("#myModal")
	modal.style.display = "block"
	const alertText = "Are you sure want to remove note ?"
	const alertYes = <HTMLElement>document.querySelector("#alert-yes-btn")
	const alertCancel = <HTMLElement>document.querySelector("#alert-cancel-btn")
	alertYes.addEventListener("click", (e) => {
		removeNote(noteId)
		redirectToHome()
	})
	alertCancel.addEventListener("click", (e) => {
		modal.style.display = "none"
	})
	// if (confirm(alertText) == true) {
	// 	removeNote(noteId)
	// 	redirectToHome()
	// }
})

window.addEventListener("storage", (e) => {
	if (e.key === "notes") {
		initializeEditPage(noteId)
	}
})
