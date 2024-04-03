import { useState, useEffect } from 'react'
import Intro from '../Components/Intro'
import QuizSelections from '../Components/QuizSelections.jsx'
import './App.css'
import {encode} from 'html-entities'

function App() {
  const [start, setStart] = useState(true)
  const [startQuiz, setStartQuiz] = useState(false)
  const [quizSelection, setQuizSelection] = useState({category: '', difficulty:''})


  function begin() {
    setStart(prevStat => !prevStat)
    // when you click begin quiz button
    // you should see the QuizSelections component
    // instead of the Intro component
    // useState hook to manage this
    // and the clickHandler function to change the state of the component
  }

  // --! callback function as props to QuizSelection component so that props can be passed to App!--
  function handleSubmit(event) {
    event.preventDefault()
    // when the form is submitted, preventing the default
    // form submission behavior
  }
  function handleChangeCategory(e) {
    console.log(e.target.value)
    const {category, value} = e.target.value
    setQuizSelection(prevQuizSelection => ({
      ...prevQuizSelection,
      [category]: value
    }))
  }
  function handleChangeDifficulty(e) {
    const {difficulty, value} = e.target.value
    setQuizSelection(prevQuizSelection => ({
      ...prevQuizSelection,
      [difficulty]: value
    }))
  }

  // --! fetch data from url !--
  useEffect(() => {
    const url = `https://opentdb.com/api.php?amount=10&category=${quizSelection.category}&category=${quizSelection.difficulty}&type=multiple`
    fetch(url)
    .then (res => res.json())
    .then (data => console.log(data['results']))
  })


  function questionAnswer(){
    // when you click the start quiz button
    // you should see the Quiz component
    // useState hook to manage this
    // and the clickHandler function to change the state of the component

  }
  return (
    <main>
      {<Intro clickHandler={begin} /> && start === false}
      {start ? <QuizSelections
        handleSubmit={handleSubmit}
        handleChangeCategory={handleChangeCategory}
        handleChangeDifficulty={handleChangeDifficulty}
      /> : null}
    </main>
  )
}

export default App
