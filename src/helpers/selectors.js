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