import { useState, useEffect } from 'react'
import Intro from '../Components/Intro'
import QuizSelection from '../Components/QuizSelection.jsx'
import './App.css'

function App() {
  const [start, setStart] = useState(true)
  const [startQuiz, setStartQuiz] = useState(false)
  const [apiResult, setApiResult] = useState([])
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizAnswers, setQuizAnswers] = useState([])
  const [quizSelection, setQuizSelection] = useState({
    category: '',
    difficulty:''
  })


  function begin() {
    setStart(prevStat => !prevStat)

    // when you click begin quiz button
    // you should see the QuizSelections component
    // instead of the Intro component
    // useState hook to manage this
    // and the clickHandler function to change the state of the component
  }

  // --! callback function as props to QuizSelection component so that props can be passed to App!--
  function handleSubmit(e) {
    e.preventDefault()
    console.log(quizSelection)
    // when the form is submitted, preventing the default
    // form submission behavior
  }
  function handleChangeCategory(e) {
    const selectedCategory = e.target.value
    setQuizSelection(prevQuizSelection => ({
      ...prevQuizSelection,
      category: selectedCategory
    }))
  }
  function handleChangeDifficulty(e) {
    const selectedDifficulty = e.target.value
    setQuizSelection(prevQuizSelection => ({
      ...prevQuizSelection,
      difficulty: selectedDifficulty
    }))
  }

  // --! fetch data from url !--
  useEffect(() => {
    const url = `https://opentdb.com/api.php?amount=10&category=${quizSelection.category}&category=${quizSelection.difficulty}&type=multiple`
    fetch(url)
    .then (res => res.json())
    .then (data => (
      setApiResult(data.results)
    ))
  },[])

  // --! map through the apiResult to get the questions !--

  function getQuizQuestions() {
    apiResult.map((object) => {
    return object['question']
  })
  }

  function getQuizAnswers() {
    const answerOptions = []
    const incorrectAnswers = apiResult.map((object) => {
    answerOptions.push(object['incorrect_answers'])
  })
    const correctAnswer = apiResult.map((object) => {
    answerOptions.push(object['correct_answer'])
  })
  }
  // console.log(getQuizAnswers())

  function questionAnswer(){
    // when you click the start quiz button
    // you should see the Quiz component
    // useState hook to manage this
    // and the clickHandler function to change the state of the component

  }
  return (
    <main>
      {<Intro clickHandler={begin} /> && start === false}
      {start ? <QuizSelection
        handleSubmit={handleSubmit}
        handleChangeCategory={handleChangeCategory}
        handleChangeDifficulty={handleChangeDifficulty}
        category={quizSelection.category}
        difficulty={quizSelection.difficulty}
      /> : null}
    </main>
  )
}

export default App
