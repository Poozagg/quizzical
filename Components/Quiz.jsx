import PropTypes from 'prop-types'
// import shuffleArray from 'shuffle-array'
import { decode } from 'html-entities'
import { useState } from 'react'

export default function Quiz(props) {
  const [userAnswers, setUserAnswers] = useState([])

  // --! function to handle the submit button !--
  function handleSubmit() {
    calculateScore(userAnswers, props.quizQuestions)
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
  console.log(userAnswers)

  // --! check userAnser against correct answer & tally up !--
  function calculateScore(userAnswers, quizQuestions) {
    let correctScore = props.score.correct
    let incorrectScore = props.score.incorrect++

    for (let i = 0; i < quizQuestions.length; i++) {
      if (userAnswers[quizQuestions[i].id] === quizQuestions[i].correct_answer) {
        correctScore++
      } else {
        incorrectScore++
      }
    }
    // return console.log({ correctScore , incorrectScore })
    return { correctScore , incorrectScore }

  }


  // --! function which will display the questions and answer options !--
  const questionAndAnswers = props.quizQuestions.map((item) => {
    // const answers = shuffleArray(item.answers)
    return (
      <div key={item.id}>
        <h2>{decode(item.question)}</h2>
        <ul className="radio--button--styling">
          {item.answers.map((answer, index) => (
            <li className="Quiz--Answer--Options" key={index}>
              <input
                type='radio'
                id={answer}
                name={item.id}
                value={answer}
                checked={userAnswers[item.id] === answer}
                onChange={onOptionChange}
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
          onClick={handleSubmit}
        >
          Submit Answer
        </button>
    </div>
  )
}

Quiz.propTypes = {
  quizQuestions: PropTypes.array.isRequired,
  score: PropTypes.object.isRequired
}
