import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Register extends Component {

    constructor() {
        super()

        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            showAlert: false,
            userId: undefined
        }
    }

    handleRegisterChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleRegisterSubmit = (event) => {
        event.preventDefault()

        const registerData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
        }
        
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(registerData)
        }

        fetch('http://localhost:4000/users', configObj)
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
                    let registerCard = document.getElementById('registerCard')
                    registerCard.style.height = '630px'
                    this.setState({
                        showAlert: true,
                    })
                }
            })

        this.setState({
            first_name: '',
            last_name: '',
            username: ''
        })
    }

    render() {
        return (
            <div className='container h-100'>
                <div className='row align-items-center h-100'>
                    <div className='mx-auto'>
                        <div className='card register-card' id='registerCard'>
                            <h2>Flatnotes 📝</h2>
                            <p className='card-subtitle'>A pretty neat note-taking app 😉</p>
                            { this.state.showAlert ? <div className="alert alert-danger" role="alert" id='loginAlert'>Username is taken!</div> : null }
                            <form onSubmit={this.handleRegisterSubmit}>
                                <label className='input-label'>First Name:</label>
                                <br />
                                <input className='input-textbox' type='text' name='first_name' placeholder='First Name' value={this.state.first_name} onChange={this.handleRegisterChange} required />
                                <br />
                                <label className='input-label'>Last Name:</label>
                                <br />
                                <input className='input-textbox' type='text' name='last_name' placeholder='Last Name' value={this.state.last_name} onChange={this.handleRegisterChange} required />
                                <br />
                                <label className='input-label'>Username:</label>
                                <br />
                                <input className='input-textbox' type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.handleRegisterChange} required />
                                <br />
                                <input className='input-btn' type='submit' value='Register  🙌' />
                            </form>
                            <Link className='card-register-link' to="/login">Login</Link>
                            <p className='card-bottom-text'>Developed by <a href='http://www.instagram.com/isaac.meedinaa' target='_blank'>@isaac.meedinaa</a> 😎</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
