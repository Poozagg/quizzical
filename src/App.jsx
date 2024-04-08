import { useState, useEffect } from 'react'
import Intro from '../Components/Intro'
import QuizSelection from '../Components/QuizSelection.jsx'
import Quiz from '../Components/Quiz'
import { nanoid } from 'nanoid'
import './App.css'

function App() {
  // begin i.e. select category and difficulty if you are ready
  const [isBegin, setIsBegin] = useState(false)
  // to start quiz after selecting category and difficulty

  //

  // to store the Q&A from the API which will be displayed
  const [quizQuestions, setQuizQuestions] = useState([])

  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [quizSelection, setQuizSelection] = useState({
    category: category,
    difficulty: difficulty,
  })

  const [isStartQuiz, setIsStartQuiz] = useState(false)


  function begin(event) {
    event.preventDefault()
    setIsBegin(true)
  }
    // when you click begin quiz button
    // you should see the QuizSelections component
    // instead of the Intro component
    // useState hook to manage this
    // and the clickHandler function to change the state of the component


  // --! callback function as props to QuizSelection component so that props can be passed to App!--
  function handleSubmit(e) {
    // when the form is submitted, preventing the default form submission behavior
    // refreshes the page, so we don't want that
    e.preventDefault()
    setQuizSelection({
        category: category,
        difficulty: difficulty,
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
    const url = `https://opentdb.com/api.php?amount=10&category=${quizSelection.category}&difficulty=${quizSelection.difficulty}&type=multiple`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Log the data received from the API
            console.log("is data.results from API an array?");
            console.log(Array.isArray(data.results));
            // Check if data.results exists before mapping over it
            if (data.results && Array.isArray(data.results)) {
                // setter functions to set quizQuestions - mapping through each item to get questions & answers
                setQuizQuestions(data.results.map((item) => ({
                    id: nanoid(),
                    question: item.question,
                    correct_answer: item.correct_answer,
                    answers: [...item.incorrect_answers, item.correct_answer]
                })));
            } else {
                console.log('Data received from the API does not have the expected structure');
            }
        })
        .catch(error => {
            console.error('Error fetching quiz data:', error);
        });
  }, [quizSelection]);
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
  // const quizQandAArray = console.log(quizQuestions)

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
          displayQuiz={displayQuiz}
        />
      )}

      {/* Render Quiz component if isStartQuiz is true */}
      {isStartQuiz && quizQandAArray }
    </main>
  )
}

export default App
