import { useState, useEffect } from 'react'
import Intro from '../Components/Intro'
import QuizSelection from '../Components/QuizSelection.jsx'
import Quiz from '../Components/Quiz'
import { nanoid } from 'nanoid'
import './App.css'
import shuffleArray from 'shuffle-array'
import { render } from 'react-dom'
import QuizResult from '../Components/QuizResult'

function App() {
  // if its true it displays the QuizSelection component
  const [isBegin, setIsBegin] = useState(false)

  // to store the category and difficulty selected by the user
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")

  // change in quizSelection trigges the useEffect hook to do API call
  const [quizSelection, setQuizSelection] = useState({
    category: category,
    difficulty: difficulty,
  })

  // if this is true displays the Quiz component
  const [isStartQuiz, setIsStartQuiz] = useState(false)

  // to store the Q&A from the API which will be displayed
  const [quizQuestions, setQuizQuestions] = useState([])

  // --! TO STORE THE USER INPUT/ANSWERS !--
  const [userAnswers, setUserAnswers] = useState([])

  // !---Score to tally up the correct and incorrect answers---!
  const [score, setScore] = useState({
    correct: 0,
    incorrect: 0,
    showScore: false
  })

  // when you click begin quiz button
  // you should see the QuizSelections component
  // instead of the Intro component
  // useState hook to manage this
  // and the clickHandler function to change the state of the component
  function begin(event) {
    event.preventDefault()
    setIsBegin(true)
  }


  function handleCategoryChange(e) {
    // console.log(e.target.name, e.target.value)
    setCategory(e.target.value)
  }
  function handleDifficultyChange(e) {
    // console.log(e.target.name, e.target.value)
    setDifficulty(e.target.value)
  }
  // console.log(quizSelection)
  // --! callback function as props to QuizSelection component so that props can be passed to App!--
  function handleSubmit(e) {
    // when the form is submitted, preventing the default form submission behavior
    // refreshes the page, so we don't want that
    e.preventDefault()
    setQuizSelection((prevQuizSelection) => ({
      ...prevQuizSelection,
      category: category,
      difficulty: difficulty,
      }
    ))
    setIsStartQuiz(true)
  }

  // ----! Using Async function and then use await to handle the promise!----

  useEffect(() => {
    async function getQuizQuestionsData() {
      const url = `https://opentdb.com/api.php?amount=5&category=${quizSelection.category}&difficulty=${quizSelection.difficulty}&type=multiple`;
      // console.log(url)
      const res = await fetch(url)
      const data = await res.json()

      // console.log("is data.results from API an array?");
      // console.log(Array.isArray(data.results));
      // console.log(data.results);

      if (data.results && Array.isArray(data.results)) {
        setQuizQuestions(data.results.map((item) => ({
          id: nanoid(),
          question: item.question,
          correct_answer: item.correct_answer,
          answers: shuffleArray([...item.incorrect_answers, item.correct_answer])
        })));
      } else {
        console.error('Data received from the API does not have the expected structure:', data);
      }

    }
    getQuizQuestionsData()
  }, [quizSelection])

  // --! function to handle the submit button !--
  function handleSubmitAnswers() {
    // console.log("submit button clicked")
    const calculatedScore = calculateScore(userAnswers, quizQuestions)
    // console.log(calculatedScore.correctScore, calculatedScore.incorrectScore)
    setScore({
      ...score,
      showScore: true,
      correct: calculatedScore.correctScore,
      incorrect: calculatedScore.incorrectScore
    })
    setIsStartQuiz(false)
    setIsBegin(false)
    // renderQuizResults
  }

  // --! function to handle the change in the answer selected by User !--
  function onOptionChange(e) {
    // console.log(e.target.name, e.target.value)
    // item id as name & answer as value
    setUserAnswers({
      ...userAnswers,
      [e.target.name]: e.target.value
    })
  }

  // --! FUNCTION TO CHECK WHETHER userAnswer IS CORRECT & TALLY UP THE SCORE !--
  function calculateScore(userAnswers, quizQuestions) {
    let correctScore = score.correct
    let incorrectScore = score.incorrect++

    for (let i = 0; i < quizQuestions.length; i++) {
      if (userAnswers[quizQuestions[i].id] === quizQuestions[i].correct_answer) {
        correctScore++
      } else {
        incorrectScore++
      }
    }
    // return console.log({ correctScore , incorrectScore })
    return { correctScore, incorrectScore }
  }

  return (
    <main>

      {/* {componentRendering()} */}

      {isBegin === false && !score.showScore && <Intro clickHandler={begin} />}

      {isBegin === true && !isStartQuiz && (
        <QuizSelection
          handleSubmit={handleSubmit}
          handleCategoryChange={handleCategoryChange}
          handleDifficultyChange={handleDifficultyChange}
          quizSelection={quizSelection}
          category={category}
          difficulty={difficulty}
        />
      )}

      {/* Render Quiz component if isStartQuiz is true */}
      {isStartQuiz
        &&
      <Quiz
        quizQuestions={quizQuestions}
        onOptionChange={onOptionChange}
        handleSubmitAnswers={handleSubmitAnswers}
        userAnswers={userAnswers}
      /> }

      {/* Render Quiz Result component after sumitting the answers */}
      {score.showScore && !isBegin && !isStartQuiz &&
      <QuizResult
        score={score}
        quizQuestions={quizQuestions}
      />}

    </main>
  )
}

export default App
