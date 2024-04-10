# Quizzical 🚀🚀

I accomplished this project while engaged in self-paced learning of React through Scrimba. This is a solo project which is the part of the Scrimba Learn React Course.

This app was exclusively built on conditional rendering of the components, making it a particularly enjoyable aspect, all without the use of any router.

## Table of contents:
1. Overview
    - App Features
    - User Journey Video
2. Design Process
    - Tech Stack Used
    - Future Improvements
3. Resources used


## 1. Overview

During this project, I had the opportunity to apply all the concepts I've learned in React as I develop an interactive and enjoyable application. "Quizzical" showcases 5 questions, each with 4 possible answers, prompting users to select one. After submitting their choices, correct answers are indicated in green while incorrect ones are highlighted in red. Furthermore, if an answer is incorrect, the correct option is highlighted in blue for clarity. Points are tallied and prominently displayed for easy reference.

Link to: https://quizzical-24.netlify.app/

### App Features
- Allowing users to select the quiz category and difficulty level of their preference.
- Displaying quiz questions tailored to the chosen category and difficulty.
- Validating user-selected answers for correctness.
- Clearly presenting correct responses.
- Tracking and displaying accumulated points.
- Offering users the choice to replay the game session if desired.

<!-- ### User Journey Video -->




## 2. Design Process
A Figma file was provided, illustrating the proposed visual design of the application.

The development process commenced with a thorough examination of the Figma files to identify potential approaches for component setup. A comprehensive plan was then drafted to outline the focus and objectives of each component. Subsequently, initial CSS styling and the Intro.jsx component were established.

The Main.jsx file served as the foundation of the app, responsible for displaying the App component, which managed the conditional rendering of other components.

Following the setup of the Intro.jsx file, quizSelection.jsx was developed to allow users to choose categories and difficulty levels via a select option form. These selections were then integrated into the URL for fetching data from the Open Trivia DB API.

Continuing with development, the Quiz.jsx component was designed to present questions and multiple answer options to users, with a radio form enabling single-answer selection.

Subsequently, the quizResult component was created to display user selections, correct answers, and dynamically adjust styling based on predefined criteria.

Once the component setup was completed, a validation function was implemented to assess user answers and calculate points.

Upon completion of the user's interaction, they would be given the option to replay the game.

Finally, comprehensive checks were conducted to ensure that the application met the required standards of responsiveness and accessibility.

### Tech stack used
- HTML
- CSS
- React
- npm (shuffleArray, nanoid, html-entities)

### Future Improvements
Further refactoring of the code is necessary to enhance its cleanliness and adhere more closely to the DRY (Don't Repeat Yourself) principle.

## 3. Resources Used
- Scrimba [https://scrimba.com/learn/learnreact]
- Open Trivia DB API [https://opentdb.com/api_config.php]

#### Website Created by: Pooja Gurung
