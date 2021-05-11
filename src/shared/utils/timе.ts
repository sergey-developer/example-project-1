export const secToTime = (seconds: number): string => {
  if (!seconds) return '';

  return new Date(0, 0, 0, 0, 0, seconds).toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true
  });
};

export function secToTimeForInput(duration: number) {
  let minutes: any = Math.floor((duration / (1 * 60)) % 60),
    hours: any = Math.floor((duration / (1 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  if (isNaN(+hours)) {
    hours = '00';
  }

  if (isNaN(+minutes)) {
    minutes = '00';
  }

  return hours + ':' + minutes;
}

export function hoursAndMinuteToSec(time: string) {
  const timeParts = time.split(':');
  return +timeParts[0] * (60 * 60) + +timeParts[1] * 60;
}
