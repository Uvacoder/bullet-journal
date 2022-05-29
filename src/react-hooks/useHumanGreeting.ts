import dayjs from 'dayjs'

type UseHumanGreetingProps = {
  // 24hr time to split the afternoon. Default 12
  splitAfternoon?: number
  // 24hr time to split the evening Default 17
  splitEvening?: number
  template: (greeting: string) => string
}
export const useHumanGreeting = (props?: UseHumanGreetingProps): string => {
  const splitAfternoon = props?.splitAfternoon || 12
  const splitEvening = props?.splitEvening || 17

  const template = props?.template || ((greeting: string) => `Good ${greeting}!`)
  const currentTime = dayjs()
  const currentHour = currentTime.hour()

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    return template('afternoon')
  } else if (currentHour >= splitEvening) {
    return template('evening')
  }
  return template('morning')
}
