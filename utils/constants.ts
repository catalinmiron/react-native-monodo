import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);
dayjs.extend(isoWeek);

export const globalFormatter = `YYYY-MM-DD`;
export const localFormatter = `MMMM, DD YYYY`;
export const weekDayFormatter = `dddd`;

export const getWeekDays = () =>
  [...Array(7).keys()].map((key) => {
    return dayjs().startOf("isoWeek").add(key, "day").format(globalFormatter);
  });

export type WeekDayIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const _opacity = 0.4;
export const weekDayColors = {
  0: `rgba(132, 132, 132, ${_opacity})`,
  1: `rgba(215, 215, 215, ${_opacity})`, // Monday
  2: `rgba(206, 206, 206, ${_opacity})`,
  3: `rgba(201, 201, 201, ${_opacity})`,
  4: `rgba(192, 192, 192, ${_opacity})`,
  5: `rgba(172, 172, 172, ${_opacity})`,
  6: `rgba(152, 152, 152, ${_opacity})`,
  7: `rgba(132, 132, 132, ${_opacity})`,
};

import colors from "tailwindcss/colors";

export const twColors = colors;
