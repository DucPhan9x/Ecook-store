const getMonthsByquater = (quater) => {
  switch (quater) {
    case 1:
      return [1, 2, 3];
    case 2:
      return [4, 5, 6];
    case 3:
      return [7, 8, 9];
    case 4:
      return [10, 11, 12];
    default:
      break;
  }
};
const getDaysByMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const getQuaterByMonth = (month) => {
  if (month < 4) return 1;
  if (month < 7) return 2;
  if (month < 10) return 3;
  return 4;
};
const getWeekByDate = (currentdate) => {
  var oneJan = new Date(currentdate.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
};

const getDateInWeek = (today) => {
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const first = new Date(today.setDate(diff));
  const miliSeconds = first.getTime() + 6 * 86400000;
  const last = new Date(miliSeconds);
  return [first, last];
};
export const dateFunction = {
  getMonthsByquater,
  getDaysByMonth,
  getQuaterByMonth,
  getDateInWeek,
  getWeekByDate,
};
