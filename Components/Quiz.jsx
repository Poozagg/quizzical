import PropTypes from 'prop-types'
// import shuffleArray from 'shuffle-array'
import { decode } from 'html-entities'
import { useState } from 'react'

export default function Quiz(props) {
  const [userAnswers, setUserAnswers] = useState([])

  // --! function to handle the submit button !--
  function handleSubmit() {
    // e.defaultPrevent()
    // console.log(e.target.value)
    // setUserAnswers({
    //   ...userAnswers,
    //   [e.target.name]: e.target.value
    // })
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

  // --! function to shuffle the answers !--
  // note suffles once and then doesnt shuffle again at


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
  quizQuestions: PropTypes.array.isRequired
}
