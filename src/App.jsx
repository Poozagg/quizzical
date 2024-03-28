import { useState } from 'react'
import Intro from '../Components/Intro'
import QuizOptions from '../Components/QuizOptions.jsx'
import './App.css'

function App() {
  const [start, setStart] = useState(true)

  function begin() {
    setStart(prevStat => !prevStat)
    // when you click begin quiz button
    // you should see the QuizOptions component
    // instead of the Intro component
    // you can use the useState hook to manage this
    // and the clickHandler function to change the state
    // of the component
  }
  return (
    <main>
      {<Intro clickHandler={begin} /> && start === false}
      {start ? <QuizOptions /> : null}
    </main>
  )
}

export default App
