import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteNote } from '../actions/noteActions'

export class ShowNote extends Component {

    componentDidMount() {
        if (!this.props.user) {
            this.props.history.push('/login')
        }
    }

    handleGoBackClick = () => {
        this.props.history.goBack()
    }

    handleNoteEditPageClick = () => {
        this.props.history.push({
            pathname: `/notes/${this.props.location.state.note.id}/edit`,
            state: { note: this.props.location.state.note }
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
        console.log(this.props)
        return (
            <div className='container h-100'>
                <div className='row align-items-center h-100'>
                    <div className='mx-auto'>
                        <div className='btn-container'>
                            <button className='back-btn' onClick={this.handleGoBackClick}>Go Back</button>
                        </div>
                        <div className='card note-card'>
                            <h5>{this.props.location.state.note.title}</h5>
                            <p>{this.props.location.state.note.content}</p>
                            <p className='note-card-created-date'>{this.props.location.state.note.created_date}</p>
                            <div className='note-card-btns'>
                                <button className='note-card-btn' onClick={this.handleNoteEditPageClick}>✏️</button>
                                <button className='note-card-btn' id='delete-btn' onClick={() => this.handleNoteDeleteClick(this.props.note.id)}>🚮</button>                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteNote: (noteId) => dispatch(deleteNote(noteId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowNote)
