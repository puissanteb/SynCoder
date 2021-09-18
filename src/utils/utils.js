import { Typography, Link } from '@material-ui/core'

export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                SynCoder
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export const formatDate = (inputDate, now) => {
    const today =
        inputDate.getFullYear() === now.getFullYear() &&
        inputDate.getMonth() === now.getMonth() &&
        inputDate.getDate() === now.getDate()
    const year =
        inputDate.getFullYear() === now.getFullYear()
            ? ''
            : `${inputDate.getFullYear()}년 `

    const date = today
        ? ''
        : `${inputDate.getMonth() + 1}월 ${inputDate.getDate()}일 `

    const time = today
        ? compareTime(inputDate, now)
        : `${inputDate.getHours()}시 ${inputDate.getMinutes()}분`
    return `${year}${date}${time}`
}

const compareTime = (a, b) => {
    const hoursElapsed = b.getHours() - a.getHours()
    const minutesElapsed = hoursElapsed * 60 + b.getMinutes() - a.getMinutes()
    return minutesElapsed >= 60
        ? `${hoursElapsed}시간 전`
        : `${minutesElapsed}분 전`
}
