import PropTypes from 'prop-types'
// import shuffleArray from 'shuffle-array'
import { decode } from 'html-entities'
import { useState } from 'react'
import QuizResult from './QuizResult'

export default function Quiz(props) {
  // const [userAnswers, setUserAnswers] = useState([])

  // ----! to count the score of the user ! ----
  // also need boolean to check if the score to be displayed
  // const [score, setScore] = useState({
  //   correct: 0,
  //   incorrect: 0,
  //   showScore: false
  // })

  // --! function to handle the submit button !--
  // function handleSubmit() {
  //   calculateScore(userAnswers, props.quizQuestions)
  //   setScore({
  //     ...score,
  //     showScore: true
  //   })
  //   props.renderQuizResults
  // }

  // // --! function to handle the change in the answer selected by User !--
  // function onOptionChange(e) {
  //   // console.log(e.target.name, e.target.value)
  //   // item id as name & answer as value
  //   setUserAnswers({
  //     ...userAnswers,
  //     [e.target.name]: e.target.value
  //   })
  // }
  // console.log(userAnswers)

  // --! check userAnser against correct answer & tally up !--
  // function calculateScore(userAnswers, quizQuestions) {
  //   let correctScore = score.correct
  //   let incorrectScore = score.incorrect++

  //   for (let i = 0; i < quizQuestions.length; i++) {
  //     if (userAnswers[quizQuestions[i].id] === quizQuestions[i].correct_answer) {
  //       correctScore++
  //     } else {
  //       incorrectScore++
  //     }
  //   }
  //   // return console.log({ correctScore , incorrectScore })
  //   return { correctScore, incorrectScore }
  // }


  // --! function which will display the questions and answer options !--
  const questionAndAnswers = props.quizQuestions.map((item) => {
    // const answers = shuffleArray(item.answers)
    return (
      <div key={item.id}>
        <h3>{decode(item.question)}</h3>
        <ul className="radio--button--styling">
          {item.answers.map((answer, index) => (
            <li className="Quiz--Answer--Options" key={index}>
              <input
                type='radio'
                id={answer}
                name={item.id}
                value={answer}
                checked={props.userAnswers[item.id] === answer}
                onChange={props.onOptionChange}
              />
              {/* decoding the answer to display ONLY!! */}
              <label htmlFor={answer}>{decode(answer)}</label>
            </li>
          ))}
          <hr className="horizontal--line" />
        </ul>
      </div>
    )
  })


  return (
    <div>
      <div>
        {questionAndAnswers}
      </div>
        <button
          className='submit--answer--button'
          onClick={props.handleSubmitAnswers}
        >
          Submit Answer
        </button>
    </div>
  )
}

Quiz.propTypes = {
  quizQuestions: PropTypes.array.isRequired,
  userAnswers: PropTypes.array.isRequired,
  onOptionChange: PropTypes.func.isRequired,
  handleSubmitAnswers: PropTypes.func.isRequired,
}
