import PropTypes from 'prop-types';
QuizSelection.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangeCategory: PropTypes.func.isRequired,
  handleChangeDifficulty: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired
};
export default function QuizSelection(props) {

  return (
    <div className="quizoption--container">
      <h2> Choose your quiz-type </h2>
      <form method="post" onSubmit={props.handleSubmit}>
        <label htmlFor="quiz" className="quiz--heading"><h3>Category:</h3></label>
        <select
          name="selectedQuizCategory"
          id="quiz-category"
          className='quiz--selection'
          value = {props.category}
          onChange={props.handleChangeCategory}
        >
          {/* <option value="any">Any Category</option> */}
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </select>

        <label htmlFor="quiz" className="quiz--heading"><h3>Difficulty:</h3></label>
        <select
          name="selectedQuizDifficulty"
          id="quiz-difficulty"
          className='quiz--selection'
          // value = {props.difficulty}
          onChange={props.handleChangeDifficulty}
        >
          {/* <option value="any">Any Difficulty</option> */}
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <br />
        <br />
        {/* <input
          className='start--button'
          type="submit"
          value="Start Quiz"
          onChange={handleChange}
        /> */}
        <button className='start--button'>
          Submit Quiz
        </button>
      </form>

    </div>
  )
}
