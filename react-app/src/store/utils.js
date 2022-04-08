import { getTimeElapsed } from "../utils";

export const normalizePosts = (postsArr) => {
    return postsArr.reduce((obj, post) => {
        post.timeElapsed = getTimeElapsed(post.createdAt);
        obj[post.id] = post;
        
        obj[post.id].comments = {
            ...normalizeOneLevel(post.comments),
        }

        obj[post.id].postLikes = {
            ...normalizeOneLevel(post.postLikes),
        }

        return obj
    }, {})
}

export const normalizeOneLevel = (dataArr) => {
    return dataArr.reduce((obj, data) => {
        data.timeElapsed = getTimeElapsed(data.createdAt);
        obj[data.id] = data;
        return obj;
    }, {})
}
