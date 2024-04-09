import { useState, useEffect } from 'react'
import Intro from '../Components/Intro'
import QuizSelection from '../Components/QuizSelection.jsx'
import Quiz from '../Components/Quiz'
import { nanoid } from 'nanoid'
import './App.css'
import shuffleArray from 'shuffle-array'

function App() {
  // begin i.e. select category and difficulty if you are ready
  const [isBegin, setIsBegin] = useState(false)

  // to store the category and difficulty selected by the user
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")

  // change in quizSelection trigges the useEffect hook to do API call
  const [quizSelection, setQuizSelection] = useState({
    category: category,
    difficulty: difficulty,
  })

  // to start quiz after selecting category and difficulty
  const [isStartQuiz, setIsStartQuiz] = useState(false)

  // to store the Q&A from the API which will be displayed
  const [quizQuestions, setQuizQuestions] = useState([])

  // to count the score of the user
  // also need boolean to check if the score to be displayed
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
    console.log(e.target.name, e.target.value)
    setCategory(e.target.value)
  }
  function handleDifficultyChange(e) {
    console.log(e.target.name, e.target.value)
    setDifficulty(e.target.value)
  }
  console.log(quizSelection)
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

  // --! fetch data from url !--
  // any time the quizSelection changes, the useEffect hook will run
  // apiresultArray is an array of objects
  useEffect(() => {
    const url = `https://opentdb.com/api.php?amount=10&category=${quizSelection.category}&difficulty=${quizSelection.difficulty}&type=multiple`;
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Log the data received from the API
            console.log("is data.results from API an array?");
            console.log(Array.isArray(data.results));
            // console.log(data.results);
            // Check if data.results exists before mapping over it
            if (data.results && Array.isArray(data.results)) {
                // setter functions to set quizQuestions - mapping through each item to get questions & answers
                setQuizQuestions(data.results.map((item) => ({
                    id: nanoid(),
                    question: item.question,
                    correct_answer: item.correct_answer,
                    // so that the answers are shuffled before passing as props to Quiz component
                    answers: shuffleArray([...item.incorrect_answers, item.correct_answer])
                })));
            } else {
                console.log('Data received from the API does not have the expected structure');
            }
        });
  }, [quizSelection]);
    console.log("this has shuffled answers")
    console.log(quizQuestions)

  function displayQuiz() {
    // callback function to display the quiz after category and difficulty are selected
    setIsStartQuiz(true)
    // console.log(isStartQuiz)
  }

  return (
    <main>

      {/* {componentRendering()} */}

      {isBegin === false && <Intro clickHandler={begin} />}

      {isBegin === true && !isStartQuiz && (
        <QuizSelection
          handleSubmit={handleSubmit}
          handleCategoryChange={handleCategoryChange}
          handleDifficultyChange={handleDifficultyChange}
          quizSelection={quizSelection}
          category={category}
          difficulty={difficulty}
          // displayQuiz={displayQuiz}
        />
      )}

      {/* Render Quiz component if isStartQuiz is true */}
      {isStartQuiz
        &&
        <Quiz
          quizQuestions={quizQuestions}
          score={score}
        /> }
    </main>
  )
}

export default App
