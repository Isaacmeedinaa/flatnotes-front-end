import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editNote } from '../actions/noteActions'

export class EditNote extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: props.location.state.note.title,
            content: props.location.state.note.content
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

    handleEditNoteChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleEditNoteSubmit = (event) => {
        event.preventDefault()

        const noteData = {
            title: this.state.title,
            content: this.state.content,
            user_id: this.props.user.id
        }

        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(noteData)
        }

        fetch(`http://localhost:4000/notes/${this.props.location.state.note.id}`, reqObj)
        .then(resp => resp.json())
        .then(note => {
            console.log(note)
            this.props.editNote(note)
            this.props.history.push('/notes')
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
                        <div className='note note-form-card'>
                            <h2>Edit Note 📝</h2>
                            <p className='card-subtitle'>Go ahead and edit your note 😉</p>
                            <form onSubmit={this.handleEditNoteSubmit}>
                                <label className='note-form-input-label'>Title:</label>
                                <br />
                                <input className='note-form-input-textbox' type='text' name='title' placeholder='Note Title' value={this.state.title} onChange={this.handleEditNoteChange} required />
                                <br />
                                <label className='note-form-input-label'>Note:</label>
                                <br />
                                <textarea className='note-form-input-textbox' id='noteFormTextboxNoteContent' type='text' name='content' placeholder='Note Content' value={this.state.content} onChange={this.handleEditNoteChange} required />
                                <br />
                                <input className='note-form-input-btn' type='submit' value='Update Note  🙌' />
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
        editNote: (note) => dispatch(editNote(note))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote)
