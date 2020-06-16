import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchNotes } from './actions/noteActions'
import NotesContainer from './containers/NotesContainer'
import Login from './components/Login'
import Register from './components/Register'

class App extends Component {

  constructor() {
    super()
    
    this.state = {
      userId: undefined
    }
  }

  // componentDidMount() {
  //   this.props.fetchNotes(this.state.userId)
  // }

  getUserId = (userId) => {
    this.setState({
      userId: userId
    })
  }

  render() {
    return (
      <Router>
        <Route path='/login' render={(props) => <Login {...props} getUserId={this.getUserId} /> } />
        <Route path='/register' render={(props) => <Register {...props} getUserId={this.getUserId} /> } />
        <Route path='/notes' render={(props) => <NotesContainer {...props} fetchNotes={this.props.fetchNotes} notes={this.props.notes} isLoading={this.props.loading} />} />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (userId) => dispatch(fetchNotes(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
