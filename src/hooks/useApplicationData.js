import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {

//combine all states into one object
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

const setDay = day => setState({ ...state, day });

useEffect(() => {
  Promise.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers")
  ]).then((response) => {
    setState(prev => ({
      ...prev,
      days: response[0].data,
      appointments: response[1].data,
      interviewers: response[2].data
    }));
    //console.log(response[0].data);
    //console.log(response[1].data);
    //console.log(response[2].data);
  });
}, []);

function bookInterview(id, interview) {

  return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
    .then(response => {
      if (response.status === 204) {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments,
        });
      }
    }).catch(error => {
      throw new Error(error);
    });
};

function cancelInterview(id) {

  return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(response => {
      if (response.status === 204) {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments,
        });
      }
    }).catch(error => {
      throw new Error(error);
    });
};
  return { state, bookInterview, cancelInterview, setDay };
};