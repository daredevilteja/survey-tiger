import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { surveySlice } from "../store/surveySlice";

function ConfirmSurvey() {
  const { surveyId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const survey = useSelector((globalStore) =>
    globalStore.surveys.map((s) => s.surveyId === surveyId)
  );

  const confirmandPublishSurvey = () => {
    dispatch(surveySlice.actions.markPublished({ surveyId }));
    history.pushState("/");
  };
  return (
    <>
      {survey.questions.map((q) => (
        <>
          <h4>{q.questions}</h4>
          {q.type === "single" ? (
            <>
              <label>{q.options[0]}</label>
              <input type="radio" />
              <label>{q.options[1]}</label>
              <input type="radio" />
            </>
          ) : (
            <>
              <label>{q.options[0]}</label>
              <input type="checkbox" />
              <label>{q.options[1]}</label>
              <input type="checkbox" />
              <label>{q.options[2]}</label>
              <input type="checkbox" />
              <label>{q.options[3]}</label>
              <input type="checkbox" />
            </>
          )}
        </>
      ))}
      <Button className="survey-main-btn" onClick={confirmandPublishSurvey}>
        Confirm Survey
      </Button>
    </>
  );
}

export default ConfirmSurvey;
