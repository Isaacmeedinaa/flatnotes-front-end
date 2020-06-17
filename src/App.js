import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import Login from './components/Login'
import Register from './components/Register'
import EditNote from './components/EditNote'
import ShowNote from './components/ShowNote'
import NotesForm from './components/NoteForm'
import NotesContainer from './containers/NotesContainer' 

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' render={(props) => <Login {...props} /> } />
          <Route path='/register' render={(props) => <Register {...props} /> } />
          <Route path='/notes/new' render={(props) => <NotesForm {...props} />} />
          <Route path='/notes/:id/edit' render={(props) => <EditNote {...props} />} />
          <Route path='/notes/:id' render={(props) => <ShowNote {...props} />} />
          <Route path='/notes' render={(props) => <NotesContainer {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default connect()(App)
