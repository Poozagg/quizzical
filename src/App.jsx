import { useState, useEffect } from 'react'
import Intro from '../Components/Intro'
import QuizSelection from '../Components/QuizSelection.jsx'
import Quiz from '../Components/Quiz'
import { nanoid } from 'nanoid'
import './App.css'

function App() {
  const [start, setStart] = useState(true)
  const [startQuiz, setStartQuiz] = useState(false)
  const [apiResultArray, setApiResultArray] = useState([])
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizAnswerOptions, setAnswerOptions] = useState([])
  const [quizSelection, setQuizSelection] = useState({
    category: "",
    difficulty: ""
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
    // when the form is submitted, preventing the default form submission behavior
    // refreshes the page, so we don't want that
  }
  function handleChange(e) {
    // dynamic name and value from the event object so
    // works for both category and difficulty event listeners
    const {name, value} = e.target
    // console.log(e.target.name, e.target.value)
    setQuizSelection(prevQuizSelection => {
      return {
        ...prevQuizSelection,
        [name]: value
      }
    })
  }


  // --! fetch data from url !--
  // any time the quizSelection changes, the useEffect hook will run
  // apiresultArray is an array of objects
  useEffect(() => {
    const url = `https://opentdb.com/api.php?amount=10&category=${quizSelection.category}&difficulty=${quizSelection.difficulty}&type=multiple`
    // console.log(url)

    fetch(url)
    .then (res => res.json())
    .then (data => (
      // console.log(data.results)
      // setter functions to set quizQuestions - mapping through each item to get questions & answers
      setQuizQuestions(data.results.map((item) => {
        // const {question, correct_answer, answers} = item
        return {
          id: nanoid(),
          question: item.question,
          correct_answer: item.correct_answer,
          answers: [...item.incorrect_answers, item.correct_answer]
        }
      }))
      ))
    },[quizSelection])
    // console.log(quizQuestions)

  // --! onClick function which will display the questions !--
  const quizQandAArray = quizQuestions.map((item) => {
    return (
      <Quiz
        key={item.id}
        question={item.question}
        answers={item.answers}
      />
    )
  })

  function displayQuiz() {
    setStartQuiz(prevStartQuiz => !prevStartQuiz)
    // setStart(prevStart => !prevStart)
    // console.log(quizQuestions)
    // quizQandAArray
  }

  return (
    <main>
      {<Intro clickHandler={begin} /> && start === false}
      {start ? <QuizSelection
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        quizSelection={quizSelection}
        displayQuiz={displayQuiz}
      /> : null}
      {startQuiz ? quizQandAArray  : null}
      {displayQuiz && start === false}
    </main>
  )
}

export default App
