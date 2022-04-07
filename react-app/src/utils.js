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
