import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Component.css'

export class Login extends Component {

    constructor() {
        super()

        this.state = {
            username: '',
            showAlert: false,
            userId: undefined
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

        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(loginData)
        }

        fetch('http://localhost:4000/login', configObj)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.status !== 401) {
                    this.setState({
                        userId: resp.id
                    })
                    this.props.getUserId(this.state.userId)
                    this.props.history.push({
                        pathname: '/notes',
                        state: { userId: this.state.userId }
                    })
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

export default Login
