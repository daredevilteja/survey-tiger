import logo from "./logo.png";
import "./App.css";
import { Button } from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateSurvey from "./components/create-survey";
import { Provider } from "react-redux";
import { store } from "./store/global-store";

function App() {
  return (
    <Provider store={store}>
      <Router>
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
              <Link to="/create/123">
                <Button className="survey-main-btn">Create Survey</Button>
              </Link>
              <Link to="/take">
                <Button className="survey-main-btn">Take Survey</Button>
              </Link>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
