import PropTypes from 'prop-types'
import shuffleArray from 'shuffle-array'
import { decode } from 'html-entities'

export default function Quiz(props) {
  // --! onClick function which will display the questions and answer options !--
  // const quizQandA = props.quizQuestions.map((item) => {
  //   return (
  //     <Quiz
  //       key={item.id}
  //       question={item.question}
  //       answers={item.answers}
  //     />
  //   )
  // })
  // --! function which will display the questions and answer options !--
  const questionAndAnswers = props.quizQuestions.map((item) => {
    const answers = shuffleArray(item.answers)
    return (
      <div key={item.id}>
        <h3>{decode(item.question)}</h3>
        <ul className="radio--button--styling">
          {answers.map((answer, index) => (
            <li className="Quiz--Answer--Options" key={index}>
              <input type='radio' id={answer} name={item.id} value={answer} />
              {/* decoding the answer to display ONLY!! */}
              <label htmlFor={answer}>{decode(answer)}</label>
            </li>
          ))}
        </ul>
      </div>
    )
  })


  return (
    <div>
      <div>
        {questionAndAnswers}
      </div>
        <button className='submit--answer--button'>
          Submit Answer
        </button>
    </div>
  )
}

Quiz.propTypes = {
  // question: PropTypes.string.isRequired,
  // answers: PropTypes.array.isRequired,
  quizQuestions: PropTypes.array.isRequired
}
