import PropTypes from 'prop-types'
import shuffleArray from 'shuffle-array'
import { decode } from 'html-entities'
import { useState } from 'react'

export default function Quiz(props) {
  const [userAnswers, setUserAnswers] = useState([])

  // --! function to handle the submit button !--
  function handleSubmit(e) {
    // e.defaultPrevent()
    console.log(e.target.name, e.target.value)
    // setUserAnswers({
    //   ...userAnswers,
    //   [e.target.name]: e.target.value
    // })
  }

  // --! function to handle the change in the answer selected by User !--
  // function onOptionChange(e) {
  //   console.log(e.target.name, e.target.value)
  //   setUserAnswers({
  //     ...userAnswers,
  //     [e.target.name]: e.target.value
  //   })
  // }

  // --! function which will display the questions and answer options !--
  const questionAndAnswers = props.quizQuestions.map((item) => {
    const answers = shuffleArray(item.answers)
    return (
      <div key={item.id}>
        <h2>{decode(item.question)}</h2>
        <ul className="radio--button--styling">
          {answers.map((answer, index) => (
            <li className="Quiz--Answer--Options" key={index}>
              <input
                type='radio'
                id={answer}
                name={item.id}
                value={answer}
                // checked={userAnswers[item.id] === answer}
                // onChange={onOptionChange}
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
  // question: PropTypes.string.isRequired,
  // answers: PropTypes.array.isRequired,
  quizQuestions: PropTypes.array.isRequired
}
