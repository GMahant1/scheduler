import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  //mode constants for visualMode function

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  function onDelete(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING, true);
    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch((error) => console.log(error));
  };


  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={onSave}
          onCancel={() => back()}
        />
      )}

      {mode === SAVING && (<Status message={`Saving...`} />)}

      {mode === DELETING && (
        <Status
          message={`Deleting...`} />
      )}

      {mode === CONFIRM && (
        <Confirm
          onCancel={() => {
            transition(SHOW);
          }}
          onConfirm={(name, interviewer) => {
            onDelete(name, interviewer);
          }}
          message={`Are you sure you want to delete this?`} />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={onSave} />
      )}
    </article>);
};

