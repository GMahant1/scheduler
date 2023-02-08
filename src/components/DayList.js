import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList (props) {

  const schedule = props.days.map(dayArr => {
    
    return (
      <DayListItem
        key={dayArr.id}
        name={dayArr.name}
        spots={dayArr.spots}
        selected={dayArr.name === props.value}
        setDay={props.onChange} />
    )
  })

  return <ul>{schedule}</ul>;
}