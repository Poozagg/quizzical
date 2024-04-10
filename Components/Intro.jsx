import PropTypes from 'prop-types'
export default function Intro(props) {
  return (
    <div>
      <h1> Quizzical </h1>
      <h3> Ready to test your knowledge? </h3>
      <h3> Welcome aboard the Quizzical app! </h3> <img src="../public/quiz.png" alt="logo" width="30%" />
      <br />
        <button
          className="begin--button"
          onClick={props.clickHandler}
        >
          Begin
        </button>
    </div>
  )
}

Intro.propTypes = {
  clickHandler: PropTypes.func.isRequired
}
