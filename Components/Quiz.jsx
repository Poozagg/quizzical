import PropTypes from 'prop-types'

export default function Quiz(props) {
  // const suffledAnswers = props.answers.sort(() => Math.random() - 0.5)
  return (
    <div>
      <div>
        <h3>{props.question}</h3>
        {/* <ul>
          {suffledAnswers.map( answer => (
            <li>{answer}</li>
          ))}
        </ul> */}
      </div>
      {/* <button className='start--button'>
        Check answers
      </button> */}
    </div>
  )
}

Quiz.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired
}
