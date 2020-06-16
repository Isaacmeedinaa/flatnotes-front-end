import React, { Component } from 'react'
import './Component.css'

export class Note extends Component {

    handleDeleteClick = (noteId) => {
        const configObj = {
            method: 'DELETE'
        }

        fetch(`http://localhost:4000/notes/${noteId}`, configObj)
            .then(resp => resp.json())
            .then(note => {
                this.props.deleteNote(noteId)
            })
    }

    render() {
        return (
            <div className='card note-card'>
                <h5>{this.props.note.title}</h5>
                <p>{this.props.note.content}</p>
                <p className='note-card-created-date'>{this.props.note.created_date}</p>
                <div className='note-card-btns'>
                    <button className='note-card-btn' onClick={null}>👀</button>
                    <button className='note-card-btn' id='delete-btn' onClick={() => this.handleDeleteClick(this.props.note.id)}>🚮</button>
                </div>
            </div>
        )
    }
}

export default Note
