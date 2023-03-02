import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

export default function InterviewerList (props) {

  const interviewerSchedule = props.interviewers.map(intArr => {

    return (
      <InterviewerListItem 
      key={intArr.id}
      name={intArr.name}
      avatar={intArr.avatar}
      selected={intArr.id === props.value}
      setInterviewer={() => props.onChange(intArr.id)} />
    )
  })

  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewerSchedule}</ul>
  </section>

};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};