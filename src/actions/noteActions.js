export const getUserNotes = (userNotes) => {
    return {
        type: 'GET_USER_NOTES',
        userNotes
    }
}

export const createNote = (note) => {
    return {
        type: 'CREATE_NOTE',
        note
    }
}

export const editNote = (note) => {
    return {
        type: 'EDIT_NOTE',
        note
    }
}

export const deleteNote = (noteId) => {
    return {
        type: 'DELETE_NOTE',
        noteId
    }
}