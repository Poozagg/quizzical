import { useState } from 'react'
import Intro from '../Components/Intro'
import QuizOptions from '../Components/QuizOptions.jsx'
import './App.css'

function App() {
  const [start, setStart] = useState(true)
  const [startQuiz, setStartQuiz] = useState(false)


  function begin() {
    setStart(prevStat => !prevStat)
    // when you click begin quiz button
    // you should see the QuizOptions component
    // instead of the Intro component
    // useState hook to manage this
    // and the clickHandler function to change the state of the component
  }

  function questionAnswer(){
    // when you click the start quiz button
    // you should see the Quiz component
    // useState hook to manage this
    // and the clickHandler function to change the state of the component

  }
  return (
    <main>
      {<Intro clickHandler={begin} /> && start === false}
      {start ? <QuizOptions /> : null}
    </main>
  )
}

export default App
