export default function Intro(props) {
  return (
    <div>
      <h1> Quizzical </h1>
      <h3> Ready to test your knowledge? </h3>
      <h3> Welcome aboard the Quizzical app! </h3> <img src="/src/assets/quiz.png" alt="logo" width="30%" />
      <br />
        <button
          className="start--button"
          onClick={props.clickHandler}
        >
          <h3>Begin</h3>
        </button>
    </div>
  )
}
