export function getAppointmentsForDay (state, days) {
  const appointments = [];

  for (const day of state.days) {
    if (day.name === days) {
      for (const app of day.appointments) {
        if (state.appointments[app.toString()]) {
          appointments.push(state.appointments[app])
        }
      }
    }
  }
  return appointments;
}

export function getInterview (state, interview) {

  if (!interview) {
   return null;
 }
 const interviewer = state.interviewers[interview.interviewer];
 if (!interviewer) {
   return null;
 }
 return { ...interview, interviewer};
}