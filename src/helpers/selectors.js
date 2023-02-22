export function getAppointmentsForDay(state, days) {
  const appointments = [];

  for (const day of state.days) {
    if (day.name === days) {
      for (const app of day.appointments) {
        if (state.appointments[app.toString()]) {
          appointments.push(state.appointments[app]);
        }
      }
    }
  }
  return appointments;
}

export function getInterviewersForDay(state, days) {

  const interviewers = [];

  for (const day of state.days) {
    if (day.name === days) {
      for (const interviewer of day.interviewers) {
        if (state.interviewers[interviewer]) {
          interviewers.push(state.interviewers[interviewer]);
        }
      }
    }
  }
  return interviewers;
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  if (!interviewer) {
    return null;
  }
  return { ...interview, interviewer };
}