import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteNote } from '../actions/noteActions'
import './Component.css'

export class Note extends Component {

    handleNoteShowPageClick = () => {
        this.props.history.push({
            pathname: `/notes/${this.props.note.id}`,
            state: { note: this.props.note }
        })
    }

    handleNoteDeleteClick = (noteId) => {
        const reqObj = {
            method: 'DELETE'
        }

        fetch(`http://localhost:4000/notes/${noteId}`, reqObj)
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
                    <button className='note-card-btn' onClick={this.handleNoteShowPageClick}>👀</button>
                    <button className='note-card-btn' id='delete-btn' onClick={() => this.handleNoteDeleteClick(this.props.note.id)}>🚮</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteNote: (noteId) => dispatch(deleteNote(noteId))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Note))
