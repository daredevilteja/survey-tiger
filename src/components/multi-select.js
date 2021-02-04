import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { surveySlice } from "../store/surveySlice";
import { useDispatch } from "react-redux";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";

function MultiSelect() {
  const { surveyId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [options, setOptions] = useState([""]);
  const [question, setQuestion] = useState("");

  const addOption = (idx) => {
    if (options.length < 4) {
      options.splice(idx + 1, 0, "");
      setOptions([...options]);
    }
  };
  const removeOption = (idx) => {
    if (options.length > 1) {
      options.splice(idx, 1);
      setOptions([...options]);
    }
  };

  const setOptionInArray = (val, idx) => {
    options[idx] = val;
    setOptions([...options]);
  };

  const isButtonDisabled = () =>
    question.trim() === "" ||
    options.find((opt) => opt.trim() === "") !== undefined;

  const addQuestion = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "multiple",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/create/" + surveyId + "?clear=true");
  };

  const publishQuestion = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "multiple",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/confirm/" + surveyId);
  };

  return (
    <div className="question-container">
      <InputGroup className="input-grp">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>?</InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Enter your Question"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
      </InputGroup>
      <p className="options-text">Options</p>

      {options.map((val, idx) => (
        <InputGroup className="input-grp" key={`val_${idx}`}>
          <Input
            placeholder={`Option ${idx + 1}`}
            onChange={(e) => setOptionInArray(e.target.value, idx)}
            value={val}
          />
          <InputGroupAddon addonType="append">
            <Button
              onClick={() => addOption(idx)}
              disabled={options.length === 4}
            >
              +
            </Button>
            <Button
              onClick={() => removeOption(idx)}
              disabled={options.length === 1}
            >
              -
            </Button>
          </InputGroupAddon>
        </InputGroup>
      ))}
      {options.length > 3 ? (
        <div className="question-buttons">
          <Button
            className="survey-main-btn"
            onClick={addQuestion}
            disabled={isButtonDisabled()}
          >
            Add Question
          </Button>
          <Button
            className="survey-main-btn"
            onClick={publishQuestion}
            disabled={isButtonDisabled()}
          >
            Publish
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default MultiSelect;
