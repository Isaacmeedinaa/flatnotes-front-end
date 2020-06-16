export const fetchNotes = (userId) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_NOTES' })
        fetch('http://localhost:4000/notes')
            .then(resp => resp.json())
            .then(notes => {
                let userNotes = notes.filter(note => note.user.id === userId)
                dispatch({ type: 'ADD_NOTES', notes: userNotes })
            })
    }
}

export const createNote = (newNote) => {
    return {
        type: 'CREATE_NOTE',
        newNote
    }
}

export const deleteNote = (noteId) => {
    return {
        type: 'DELETE_NOTE',
        noteId
    }
}