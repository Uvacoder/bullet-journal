import dayjs from "dayjs";

type UseHumanGreetingProps = {
  // 24hr time to split the afternoon. Default 12
  split_afternoon?: number;
  //24hr time to split the evening Default 17
  split_evening?: number;
  template: (greeting: string) => string;
};
export const useHumanGreeting = (props?: UseHumanGreetingProps): string => {
  const split_afternoon = props?.split_afternoon || 12;
  const split_evening = props?.split_evening || 17;

  const template =
    props?.template || ((greeting: string) => `Good ${greeting}!`);
  const currentTime = dayjs();
  const currentHour = currentTime.hour();

  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    return template("afternoon");
  } else if (currentHour >= split_evening) {
    return template("evening");
  }
  return template("morning");
};
