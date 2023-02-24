import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



export default function Application(props) {

  //combine all states into one object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);


  const appointment = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={(getInterviewersForDay(state, state.day))}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
        throw new Error(error)
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
        throw new Error(error)
      });
  };

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment
          key="last"
          time="5pm"
          interviewers={(getInterviewersForDay(state, state.day))} />
      </section>
    </main>
  );
}
