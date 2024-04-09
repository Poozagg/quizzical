import PropTypes from 'prop-types'


export default function QuizResult(props) {

  return (
    <div>
      <h2>Quiz Result</h2>
      <h3>YOU SCORED {props.score.correct}/5 CORRECT ANSWERS </h3>
    </div>
  )
}
PropTypes.QuizResult = {
  score: PropTypes.object.isRequired
}
