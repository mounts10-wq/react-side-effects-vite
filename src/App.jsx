import { useState, useEffect } from 'react'
import JokeDisplay from './components/JokeDisplay'
import FetchButton from './components/FetchButton'

const JOKE_URL = 'https://v2.jokeapi.dev/joke/Programming?type=single'

function App() {
  const [joke, setJoke] = useState('')
  const [loading, setLoading] = useState(true)

  function fetchJoke() {
    setLoading(true)

    fetch(JOKE_URL)
      .then((res) => res.json()) 
      .then((data) => {
        setJoke(data.joke) // JokeAPI type=single returns { joke: "..." } 【1-39d496】
        setLoading(false)
      })
      .catch(() => {
        setJoke('Failed to fetch a joke. Please try again.')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchJoke()
  }, [])

  return (
    <div className="app">
      <h1>Programming Jokes</h1>
      <JokeDisplay joke={joke} loading={loading} />
      <FetchButton fetchJoke={fetchJoke} />
    </div>
  )
}

export default App
