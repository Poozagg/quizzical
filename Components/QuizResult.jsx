import PropTypes from 'prop-types'
import { decode } from 'html-entities'



export default function QuizResult(props) {
  // ----! to re-display the questions but with write answers !----
  const questionAndAnswers = props.quizQuestions.map((item) => {
    // const answers = shuffleArray(item.answers)
    return (
      <div key={item.id}>
        <h3>{decode(item.question)}</h3>
        <ul className="radio--display--styling">
          {item.answers.map((answer, index) => (
            <li className="Quiz--Answer--Options" key={index}>
              <input
                // className='quiz--answer--styling'
                type='radio'
                id={answer}
                name={item.id}
                value={answer}
                // defaultChecked={props.userAnswers[item.id] === answer}
                checked={props.userAnswers[item.id] === answer}
                disabled // to disable the radio button
                // onChange={props.onOptionChange}
              />
              {/* decoding the answer to display ONLY!! */}
              <label
                htmlFor={answer}
                // to change the background color based on the answer selected & display the correct answer
                style={{
                  "backgroundColor": answer === item.correct_answer ? 'rgba(148, 215, 162, 1)' :
                                      answer === props.userAnswers[item.id] ? 'rgba(248, 188, 188, 0.5)' : 'rgba(245, 247, 251, 1)',
                  "color": answer === item.correct_answer ? 'rgba(41, 50, 100, 1)' : 'rgba(41, 50, 100, 0.5)'
                }}
              >
                {decode(answer)}
              </label>
            </li>
          ))}
          <hr className="horizontal--line" />
        </ul>
      </div>
    )
  })
  return (
    <div>
      {/* <h2> Quiz Result</h2> */}
      <h3>You scored {props.score.correct}/5 correct answers </h3>
      <button
        className='play--again--button'
        onClick={props.handlePlayAgain}
      >
        Play Again
      </button>
      {/* display the quiz that user just answered */}
      {questionAndAnswers}
    </div>
  )
}
QuizResult.propTypes = {
  score: PropTypes.object.isRequired,
  quizQuestions: PropTypes.array.isRequired,
  userAnswers: PropTypes.object.isRequired,
  handlePlayAgain: PropTypes.func.isRequired,
}
