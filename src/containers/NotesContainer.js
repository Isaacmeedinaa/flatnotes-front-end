import React, { Component } from 'react'
import { connect } from 'react-redux'
import Note from '../components/Note'
import './Container.css'
import { logoutSuccess } from '../actions/userActions'
 
export class NotesContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            notes: props.notes
        }
    }

    componentDidMount() {
        if (!this.props.user) {
            this.props.history.push('/login')
        }
    }

    renderNotes = () => {
        return this.state.notes.map(note => <Note note={note} key={note.id} />)
    }

    handleCreateNoteClick = () => {
        this.props.history.push('/notes/new')
    }

    handleLogOutClick = () => {
        this.props.logoutSuccess()
        this.props.history.push('/login')
    }

    handleOriginalFilterClick = () => {
        this.setState({
            notes: this.props.notes
        })
    } 

    handleAlphabetFilterClick = () => {

        let duplicateNotes = [...this.state.notes]
        let filteredAlphabetNotes = duplicateNotes.sort((note_a, note_b) => note_a.title.localeCompare(note_b.title))

        this.setState({
            notes: filteredAlphabetNotes
        })
    }

    render() {
        return (
            <div className='container h-100'>
                <div className='row align-items-center h-100'>
                    <div className='mx-auto'>
                        <div className='btn-container'>
                            <div className="note-container-dropdown dropdown">
                                <button className="dropdown-btn btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Filter Your Notes
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-link dropdown-item" onClick={this.handleOriginalFilterClick}>Original</a>
                                    <a className="dropdown-link dropdown-item" onClick={this.handleAlphabetFilterClick}>Alphabet (A - Z)</a>
                                </div>
                            </div>
                            <button className='new-note-btn' id='createNoteBtn' onClick={this.handleCreateNoteClick}>Create Note</button>
                            <button className='new-note-btn' id='logOutBtn' onClick={this.handleLogOutClick}>Logout</button>
                        </div>
                        {this.renderNotes()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        notes: state.notes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutSuccess: () => dispatch(logoutSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer)
