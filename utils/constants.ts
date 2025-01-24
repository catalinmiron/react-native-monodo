import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);
dayjs.extend(isoWeek);

// export const weekDays = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
// ] as const;
// export type WeekDay = (typeof weekDays)[number];

export const globalFormatter = `YYYY-MM-DD`;
export const localFormatter = `MMMM, DD YYYY`;
export const weekDayFormatter = `dddd`;

export const weekDays = [...Array(5).keys()].map((key) => {
  return dayjs().startOf("isoWeek").add(key, "day").format(globalFormatter);
});

const _opacity = 0.1;
export const weekDayColors = {
  1: `rgba(215, 215, 215, ${_opacity})`,
  2: `rgba(206, 206, 206, ${_opacity})`,
  3: `rgba(201, 201, 201, ${_opacity})`,
  4: `rgba(192, 192, 192, ${_opacity})`,
  5: `rgba(172, 172, 172, ${_opacity})`,
};
