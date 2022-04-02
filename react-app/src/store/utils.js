export const normalizePosts = (postsArr) => {
    return postsArr.reduce((obj, post) => {
        obj[post.id] = post
        // CHECK to see if we really need to check if key exists after we create our API route/db calls
        if (obj.hasOwnProperty('comments')) {
            obj[post.id].comments = {
                ...normalizeComments(post.comments),
                allComments: post.comments
            }
        }
        return obj
    }, {})
}

export const normalizeComments = (commentsArr) => {
    return commentsArr.reduce((obj, comment) => {
        obj[comment.id] = comment
        return obj
    }, {})
}
