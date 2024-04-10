import PropTypes from 'prop-types'
// import shuffleArray from 'shuffle-array'
import { decode } from 'html-entities'


export default function Quiz(props) {
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
  userAnswers: PropTypes.object.isRequired,
  onOptionChange: PropTypes.func.isRequired,
  handleSubmitAnswers: PropTypes.func.isRequired,
}
