export const normalizePosts = (postsArr) => {
    return postsArr.reduce((obj, post) => {
        obj[post.id] = post
        // CHECK to see if we really need to check if key exists after we create our API route/db calls
        if (obj.hasOwnProperty('comments')) {
            obj[post.id].comments = {
                ...normalizeOneLevel(post.comments),
                allComments: post.comments
            }
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
