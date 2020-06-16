import React, { Component } from 'react'
import './Component.css'

export class NoteForm extends Component {

    constructor() {
        super()

        this.state = {
            title: '',
            content: ''
        }
    }

    handleNewNoteChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleNewNoteSubmit = (event) => {
        event.preventDefault()

        const noteData = {
            title: this.state.title,
            content: this.state.content,
            user_id: this.props.userId
        }

        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(noteData)
        }

        fetch('http://localhost:4000/notes', configObj)
            .then(resp => resp.json())
            .then(note => {
                let newNote = { title: this.state.title, content: this.state.content, userId: this.props.userId }
                this.props.createNote(newNote)
            })

        this.setState({
            title: '',
            content: ''
        })
        this.props.handleNewNoteFormDisplay(false)
    }

    render() {
        return (
            <div className='note note-form-card'>
                <h2>New Note 📝</h2>
                <p className='card-subtitle'>Go ahead and post in your new note 😉</p>
                {/* { this.state.showAlert ? <div className="alert alert-danger" role="alert" id='loginAlert'>Username is taken!</div> : null } */}
                <form onSubmit={this.handleNewNoteSubmit}>
                    <label className='note-form-input-label'>Title:</label>
                    <br />
                    <input className='note-form-input-textbox' type='text' name='title' placeholder='Note Title' value={this.state.title} onChange={this.handleNewNoteChange} required />
                    <br />
                    <label className='note-form-input-label'>Note:</label>
                    <br />
                    <textarea className='note-form-input-textbox' id='noteFormTextboxNoteContent' type='text' name='content' placeholder='Note Content' value={this.state.content} onChange={this.handleNewNoteChange} required />
                    <br />
                    <input className='note-form-input-btn' type='submit' value='Post Note  🙌' />
                </form>
            </div>
        )
    }
}

export default NoteForm
