import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  //functions used to store and update state
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //helper reset function
  const reset = () => {
    setStudent("")
    setInterviewer(null)
  };

  const cancel = () => {
    reset();
    props.onCancel()
  };


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={props.student}
            type="text"
            onChange={(event) => setStudent(event.target.value)}
            value={student}
            placeholder={student ? student : "Please enter your name"}
          />
        </form>

        <InterviewerList 
            interviewers={(props.interviewers)} 
            value={interviewer} 
            onChange={(event) => setInterviewer(event)}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onSubmit={event => event.preventDefault()} onClick={event => props.onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>

  );
};