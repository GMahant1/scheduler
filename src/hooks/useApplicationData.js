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

  //axios request to load initial data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((response) => {
      setState(prev => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }));
    });
  }, []);

  function bookInterview(id, interview) {

    return axios.put(`/api/appointments/${id}`, { interview })
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

          const days = updatedSpots(state, appointments);

          //days[selectDay(state.day)].spots -= 1;

          setState({
            ...state,
            appointments,
            days,
          });
        }
      }).catch(error => {
        throw new Error(error);
      });
  };

  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`)
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

          const days = updatedSpots(state, appointments);

          //days[selectDay(state.day)].spots += 1;

          setState({
            ...state,
            appointments,
            days,
          });
        }
      }).catch(error => {
        throw new Error(error);
      });
  };


  //function used to check remaining spots and update state with the correct information
  function updatedSpots(state, appointments) {
    let result = [];

    for (let day of state.days) {

      let spots = 0;
      for (let app of day.appointments) {

        if (!appointments[app].interview) {
          spots++;
        }
      }
      result.push({ ...day, spots });
    }

    return result;
  }

  return { state, bookInterview, cancelInterview, setDay };
};