const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
module.exports = {
  year,
  month,
  day,
  hours,
  minutes,
  seconds
};
