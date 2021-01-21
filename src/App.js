import logo from "./logo.png";
import "./App.css";
import { Button } from "reactstrap";
import { useHistory, Switch, Route, Link } from "react-router-dom";
import CreateSurvey from "./components/create-survey";
import { createSurvey, surveySlice } from "./store/surveySlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectToNewSurvey = () => {
    dispatch(createSurvey())
      .then(unwrapResult)
      .then((newSurveyId) => history.push("/create/" + newSurveyId));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route path="/create/:surveyId">
          <CreateSurvey />
        </Route>
        <Route path="/take">Take Survey</Route>
        <Route path="/">
          <Button className="survey-main-btn" onClick={redirectToNewSurvey}>
            Create Survey
          </Button>

          <Link to="/take">
            <Button className="survey-main-btn">Take Survey</Button>
          </Link>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
