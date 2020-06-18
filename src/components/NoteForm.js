import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNote } from '../actions/noteActions'
import './Component.css'

export class NoteForm extends Component {

    constructor() {
        super()

        this.state = {
            title: '',
            content: ''
        }
    }

    componentDidMount() {
        if (!this.props.user) {
            this.props.history.push('/login')
        }
    }

    handleGoBackClick = () => {
        this.props.history.goBack()
    }

    handleNewNoteChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleNewNoteSubmit = (event) => {
        event.preventDefault()

        const newNoteData = {
            title: this.state.title,
            content: this.state.content,
            user_id: this.props.user.id
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(newNoteData)
        }

        fetch('https://flatnotes-back-end.herokuapp.com/notes', reqObj)
        .then(resp => resp.json())
        .then(note => {
            this.props.createNote(note)
            this.props.history.push('/notes')
        })

        this.setState({
            title: '',
            content: ''
        })
    }

    render() {
        return (
            <div className='container h-100'>
                <div className='row align-items-center h-100'>
                    <div className='mx-auto'>
                        <div className='btn-container'>
                            <button className='back-btn' onClick={this.handleGoBackClick}>Go Back</button>
                        </div>
                        <div className='note note-form-card'>
                            <h2>New Note 📝</h2>
                            <p className='card-subtitle'>Go ahead and post in your new note 😉</p>
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
        createNote: (note) => dispatch(createNote(note))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm)
