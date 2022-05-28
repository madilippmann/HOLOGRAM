export function sortByCreatedAt(list) {

    return list.sort((a, b) => {

        if (Date.parse(b.createdAt) > Date.parse(a.createdAt)) {
            return 1
        } else if (Date.parse(a.createdAt) > Date.parse(b.createdAt)) {
            return -1
        } else {
            return 0
        }
    })
}

export const getTimeElapsed = createdAt => {
    const ms = Date.now() - Date.parse(createdAt);

    const secondsAgo = Math.floor(ms / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60)
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const monthsAgo = Math.floor(daysAgo / 30);
    const yearsAgo = Math.floor(daysAgo / 365);

    if (secondsAgo <= 0) return '0 seconds ago';

    if (secondsAgo === 1) return '1 second ago';
    else if (minutesAgo < 1) return secondsAgo + ' seconds ago';

    if (minutesAgo === 1) return '1 minute ago';
    else if (hoursAgo < 1) return minutesAgo + ' minutes ago';

    if (hoursAgo === 1) return '1 hour ago';
    else if (daysAgo < 1) return hoursAgo + ' hours ago';

    if (daysAgo === 1) return '1 day ago';
    else if (monthsAgo < 1) return daysAgo + ' days ago'

    if (monthsAgo === 1) return '1 month ago';
    else if (yearsAgo < 1) return monthsAgo + ' months ago';

    if (yearsAgo === 1) return '1 year ago';
    else return yearsAgo + ' years ago';
}
