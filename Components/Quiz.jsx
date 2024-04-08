import PropTypes from 'prop-types'
import shuffleArray from 'shuffle-array'

export default function Quiz(props) {
  const suffledAnswers = shuffleArray(props.answers)
  return (
    <div>
      <div>
        <h3>{props.question}</h3>
        <ul>
            <li>{suffledAnswers}</li>
        </ul>
      </div>
      {/* <button className='start--button'>
        Check answers
      </button> */}
    </div>
  )
}

Quiz.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
}
