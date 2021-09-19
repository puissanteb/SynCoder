import React, { useState, useEffect } from 'react'
import Main from './components/Main'
import Login from './components/Login'
import firebase from 'firebase'
import firebaseConfig from './firebaseConfig.json'

function App() {
    firebase.apps.length
        ? firebase.app()
        : firebase.initializeApp(firebaseConfig)

    const [user, setUser] = useState(null)
    firebase.auth().onAuthStateChanged((user) => setUser(user ?? null))

    return user ? <Main user={user} /> : <Login />
}

export default App
