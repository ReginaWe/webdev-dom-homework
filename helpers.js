export function printDate(value) {
  let date = value.getDate();
  let montch = value.getMonth() + 1;
  let year = value.getFullYear();
  let hours = value.getHours();
  let minute = value.getMinutes();
  if (date < 10) {
    date = "0" + date;
  }
  if (montch < 10) {
    montch = "0" + montch;
  }
  if (year < 10) {
    year = "0" + year;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }

  return date + "." + montch + "." + year + " " + hours + ":" + minute;
}
