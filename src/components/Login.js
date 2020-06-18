import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { loginSuccess } from '../actions/userActions'
import { getUserNotes } from '../actions/noteActions'
import './Component.css'

export class Login extends Component {

    constructor() {
        super()

        this.state = {
            username: '',
            showAlert: false
        }
    }
 
    handleLoginChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleLoginSubmit = (event) => {
        event.preventDefault()
        
        const loginData = {
            username: this.state.username
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(loginData)
        }

        fetch('https://flatnotes-back-end.herokuapp.com/login', reqObj)
        .then(resp => resp.json())
        .then(user => {
            if (user.status !== 401) {
                this.props.loginSuccess(user)
                this.props.getUserNotes(user.notes)
                this.props.history.push('/notes')
            } else {
                let loginCard = document.getElementById('loginCard')
                loginCard.style.height = '450px'
                this.setState({
                    showAlert: true,
                })
            }
        })

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div className='container h-100'>
                <div className='row align-items-center h-100'>
                    <div className='mx-auto'>
                        <div className='card login-card' id='loginCard'>
                            <h2>Flatnotes 📝</h2>
                            <p className='card-subtitle'>A pretty neat note-taking app 😉</p>
                                { this.state.showAlert ? <div className="alert alert-danger" role="alert" id='loginAlert'>Username not found!</div> : null }
                            <form onSubmit={this.handleLoginSubmit}>
                                <label className='input-label'>Username:</label>
                                <br />
                                <input className='input-textbox' type='text' placeholder='Username' value={this.state.username} onChange={this.handleLoginChange} required />
                                <br />
                                <input className='input-btn' type='submit' value='Login  🙌' />
                            </form>
                            <Link className='card-register-link' to="/register">Register</Link>
                            <p className='card-bottom-text'>Developed by <a href='http://www.instagram.com/isaac.meedinaa' target='_blank'>@isaac.meedinaa</a> 😎</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        getUserNotes: (userNotes) => dispatch(getUserNotes(userNotes))
    }
}

export default connect(null, mapDispatchToProps)(Login)
