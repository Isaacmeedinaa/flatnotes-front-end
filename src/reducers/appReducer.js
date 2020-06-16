const notes = (state = { notes: [], users: [], loading: false }, action) => {
    switch (action.type) {
        case 'LOADING_NOTES':
            return { ...state, notes: [...state.notes], loading: true }
        
        case 'ADD_NOTES':
            return { ...state, notes: action.notes, loading: false }

        case 'CREATE_NOTE':
            return { ...state, notes: state.notes.concat(action.newNote)  }

        case 'DELETING_NOTE':
            return { ...state, notes: [...state.notes], loading: true }

        case 'DELETE_NOTE':
            return { ...state, notes: state.notes.filter(note => note.id !== action.noteId) }

        default:
            return state
    }
}

export default notes