import React, { useState } from 'react'
import Main from './components/Main'
import Login from './components/Login'
import firebase from 'firebase'
import firebaseConfig from './firebaseConfig.json'

function App() {
    firebase.apps.length
        ? firebase.app()
        : firebase.initializeApp(firebaseConfig)

    const [user, setUser] = useState(firebase.auth().currentUser)

    return user ? (
        <Main user={user} setUser={setUser} />
    ) : (
        <Login setUser={setUser} />
    )
}

export default App
