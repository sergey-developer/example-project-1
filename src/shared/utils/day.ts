const dayIndexMap = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
};

const indexDayArray = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export type DayName = keyof typeof dayIndexMap;
export type DayIndex = DayName[keyof DayName];

export function dayToIndex(monthName: DayName): DayIndex {
  return dayIndexMap[monthName];
}

export function indexToDay(index: number) {
  return indexDayArray[index];
}
