import { useState, useEffect } from 'react'
import Intro from '../Components/Intro'
import QuizSelection from '../Components/QuizSelection.jsx'
import Quiz from '../Components/Quiz'
import { nanoid } from 'nanoid'
import './App.css'

function App() {
  // begin i.e. select category and difficulty if you are ready
  const [start, setStart] = useState(true)
  // to start quiz after selecting category and difficulty
  const [startQuiz, setStartQuiz] = useState(false)

  //

  // to store the Q&A from the API which will be displayed
  const [quizQuestions, setQuizQuestions] = useState([])

  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [quizSelection, setQuizSelection] = useState({
    category: category,
    difficulty: difficulty
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
    // when the form is submitted, preventing the default form submission behavior
    // refreshes the page, so we don't want that
    e.preventDefault()
    setQuizSelection({
        category: category,
        difficulty: difficulty
      }
    )
  }
  function handleCategoryChange(e) {
    // console.log(e.target.name, e.target.value)
    setCategory(e.target.value)
  }
  function handleDifficultyChange(e) {
    // console.log(e.target.name, e.target.value)
    setDifficulty(e.target.value)
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
      // console.log(Array.isArray(data.results))
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

  // --! onClick function which will display the questions and answer options !--
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
    // callback function to display the quiz after category and difficulty are selected
    setStartQuiz(prevStartQuiz => !prevStartQuiz)
  }

  return (
    <main>
      {<Intro clickHandler={begin} /> && start === false}
      {start ? <QuizSelection
        handleSubmit={handleSubmit}
        handleCategoryChange={handleCategoryChange}
        handleDifficultyChange={handleDifficultyChange}
        quizSelection={quizSelection}
        category={category}
        difficulty={difficulty}
        displayQuiz={displayQuiz}
      /> : null}
      {startQuiz ? quizQandAArray  : null}
      {/* {displayQuiz && start === false} */}
    </main>
  )
}

export default App
