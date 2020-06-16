import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Container.css'
import Note from '../components/Note'
import NoteForm from '../components/NoteForm'
import { createNote, deleteNote } from '../actions/noteActions'

export class NotesContainer extends Component {

    constructor() {
        super()

        this.state = {
            showNoteForm: false,
            newNoteBtnText: 'New Note'
        }
    }

    componentDidMount() {
        this.props.fetchNotes(this.props.location.state.userId)
    }

    renderNotes = () => {
        return this.props.notes.map(note => <Note key={note.id} note={note} deleteNote={this.props.deleteNote} />)
    }

    handleNewNoteClick = () => {
        this.setState(prevState => {
            return {
                showNoteForm: !prevState.showNoteForm,
                newNoteBtnText: this.state.showNoteForm ? 'New Note' : 'Go Back'
            }
        })
    }

    handleNewNoteFormDisplay = (boolean) => {
        this.setState({
            showNoteForm: boolean,
            newNoteBtnText: this.state.showNoteForm ? 'New Note' : 'Go Back'
        })
    }
    
    render() {
        return (
            <div className='container h-100'>
                <div className='row align-items-center h-100'>
                    <div className='mx-auto'>
                        <button className='new-note-btn' onClick={this.handleNewNoteClick}>{this.state.newNoteBtnText}</button>
                        { this.state.showNoteForm ? <NoteForm createNote={this.props.createNote} userId={this.props.location.state.userId} handleNewNoteFormDisplay={this.handleNewNoteFormDisplay} /> : this.renderNotes() }
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNote: (newNote) => dispatch(createNote(newNote)),
        deleteNote: (noteId) => dispatch(deleteNote(noteId))
    }
}

export default connect(null, mapDispatchToProps)(NotesContainer)
