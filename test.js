let posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let groupOne = [], groupTwo = [], groupThree = [];

// we'll get this from state and update it whenever we finish adding this group of
//posts so that we know where the next group of posts is what we want
let groupCounter = 0;

while(posts.length) {
    switch (groupCounter) {
        case 0:
            groupOne.push(posts.splice(0, 1)[0]);
            groupCounter++;
            continue;
        case 1:
            groupTwo.push(posts.splice(0, 1)[0]);
            groupCounter++;
            continue;
        case 2:
            groupThree.push(posts.splice(0, 1)[0]);
            groupCounter = 0;
            continue;
    }
}
