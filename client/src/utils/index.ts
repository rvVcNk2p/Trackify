import moment from 'moment'

export function capitalize (srt: string): string {
  return srt.charAt(0).toUpperCase() + srt.slice(1)
}

export function strToDate (dateStr: string): string | null {
  const parsedStr = dateStr.match(/([0-9]{1,})(d|m|h|w)/gi)
  if (parsedStr) {
    const formatedVal = parsedStr.reduce((acc, nextVal) => {
      const pPart = nextVal.match(/([0-9]{1,})|(d|m|h|w)/gi)
      if (pPart) acc[pPart[1] as keyof typeof acc] += +pPart[0]
      return acc
    }, { m: 0, h: 0, d: 0, w: 0 })

    const time = Object.entries(formatedVal).reduce((acc, nextVal) => {
      const [key, val] = nextVal
      if (key === 'm') {
        val > 0 && val % 60 > 0 && acc.finalArr.push(`${val % 60}${key}`)
        acc.next = Math.floor(val / 60)
      } else if (key === 'h') {
        const hours = acc.next + val
        hours > 0 && hours % 8 > 0 && acc.finalArr.unshift(`${hours % 8}${key}`)
        acc.next = Math.floor(val / 8)
      } else if (key === 'd') {
        const days = acc.next + val
        days > 0 && days % 5 && acc.finalArr.unshift(`${days % 5}${key}`)
        acc.next = Math.floor(val / 5)
      } else if (key === 'w') {
        const weeks = acc.next + val
        weeks > 0 && acc.finalArr.unshift(`${weeks}${key}`)
      }
      return acc
    }, { finalArr: [], next: 0 } as { finalArr: string[], next: number })
    return time.finalArr.join(' ')
  } else return null
}

export function remainingHours (dateStr: string): number {
  return moment(dateStr).diff(moment(new Date()), 'hours')
}

export function remainingMinutes (dateStr: string): number {
  return moment(dateStr).diff(moment(new Date()), 'minutes')
}

export function remainingTimeStatus (dateStr: string | null): string {
  if (dateStr === null) return ''
  const timeLeft = remainingMinutes(dateStr)
  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / 1440)
    if (days <= 1) return 'red'
    else if (days > 1 && days <= 3) return 'orange'
    else if (days > 3 && days <= 5) return 'yellow'
    else if (days > 5 && days <= 7) return 'yellow'
    else return 'green'
  } return 'overdue'
}
