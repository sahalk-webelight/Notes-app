import { v4 as uuidv4 } from "uuid"
import * as moment from "moment"

let notes = []

// Read existing notes form Local storage.
const loadNotes = () => {
	const notesJSON = localStorage.getItem("notes")
	try {
		return notesJSON ? JSON.parse(notesJSON) : []
	} catch (e) {
		return []
	}
}

// Exports notes from module
const getNotes = () => notes

// Creates a note
const createNote = () => {
	const id = uuidv4()
	const createdAt = moment().valueOf()
	notes.push({
		title: "",
		body: "",
		id,
		createdAt,
		updatedAt: createdAt,
	})

	saveNotes()

	return id
}

//saving notes in local storage.
const saveNotes = () => {
	localStorage.setItem("notes", JSON.stringify(notes))
}

//Remove a note from the list
const removeNote = (id) => {
	const noteIndex = notes.findIndex((note) => note.id === id)

	if (noteIndex > -1) {
		notes.splice(noteIndex, 1)
		saveNotes()
	}
}

//Sorting the Notes
const sortNotes = (sortBy) => {
	if (sortBy === "byEdited") {
		return notes.sort((a, b) => {
			if (a.updatedAt > b.updatedAt) {
				return -1
			} else if (a.updatedAt < b.updatedAt) {
				return 1
			} else {
				return 0
			}
		})
	} else if (sortBy === "byCreated") {
		return notes.sort((a, b) => {
			if (a.createdAt > b.createdAt) {
				return -1
			} else if (a.createdAt < b.createdAt) {
				return 1
			} else {
				return 0
			}
		})
	} else if (sortBy === "byAlpha") {
		return notes.sort((a, b) => {
			if (a.title.toLowerCase() < b.title.toLowerCase()) {
				return -1
			} else if (a.title.toLowerCase() > b.title.toLowerCase()) {
				return 1
			} else {
				return 0
			}
		})
	} else {
		return notes
	}
}

// Updating the notes
const updateNote = (id, updates) => {
	const note = notes.find((note) => note.id === id)
	if (!note) {
		return
	}

	if (typeof updates.title === "string") {
		note.title = updates.title
		note.updatedAt = moment().valueOf()
	}

	if (typeof updates.body === "string") {
		note.body = updates.body
		note.updatedAt = moment().valueOf()
	}

	saveNotes()

	return note
}

notes = loadNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote }
