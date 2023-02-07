import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  let interviewerClass = classNames("interviewers__item",
  {"interviewers__item--selected": props.selected});

  return (
    <li className={interviewerClass} onClick={() => {props.setInterviewer(props.id)}}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.selected && props.name}
    </li>);
};

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};