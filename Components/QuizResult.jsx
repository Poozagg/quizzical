import PropTypes from 'prop-types'
import { decode } from 'html-entities'



export default function QuizResult(props) {
  // ----! to re-display the questions but with write answers !----
  const questionAndAnswers = props.quizQuestions.map((item) => {
    // const answers = shuffleArray(item.answers)
    return (
      <div key={item.id}>
        <h3>{decode(item.question)}</h3>
        <ul className="radio--button--styling">
          {item.answers.map((answer, index) => (
            <li className="Quiz--Answer--Options" key={index}>
              <input
                className='quiz--answer--styling'
                type='radio'
                id={answer}
                name={item.id}
                value={answer}
                // defaultChecked={props.userAnswers[item.id] === answer}
                // checked={props.userAnswers[item.id] === answer}
                // onChange={props.onOptionChange}
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
      <h2> Quiz Result</h2>
      <h3>YOU SCORED {props.score.correct}/5 CORRECT ANSWERS </h3>
      {questionAndAnswers}

      <button
        className='play--again--button'
        // onClick={props.handleSubmitAnswers}
      >
        Play Again
      </button>
    </div>
  )
}
PropTypes.QuizResult = {
  score: PropTypes.object.isRequired,
  quizQuestions: PropTypes.array.isRequired,
}
