const notes = (state = [], action) => {
    
    switch (action.type) {
        case 'GET_USER_NOTES':
            return action.userNotes
        case 'CREATE_NOTE':
            return state.concat(action.note)
        case 'EDIT_NOTE':
            return state.filter(note => note.id !== action.note.id).concat(action.note)
        case 'DELETE_NOTE':
            return state.filter(note => note.id !== action.noteId)
        case 'SORT_NOTES_ALPHABETICAL':
            return action.notes.sort((note1, note2) => note1.title.localeCompare(note2.title))
        default:
            return state
    }
}

export default notes