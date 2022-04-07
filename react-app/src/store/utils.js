export const normalizePosts = (postsArr) => {
    return postsArr.reduce((obj, post) => {
        obj[post.id] = post

        obj[post.id].comments = {
            ...normalizeOneLevel(post.comments),
        }

        obj[post.id].postLikes = {
            ...normalizeOneLevel(post.postLikes)
        }

        return obj
    }, {})
}

export const normalizeOneLevel = (dataArr) => {
    return dataArr.reduce((obj, data) => {
        obj[data.id] = data
        return obj
    }, {})
}
