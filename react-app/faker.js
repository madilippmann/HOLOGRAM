const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const seedUsers = num => {
  let i = 0;

  while (i < num) {
    const firstName = `${faker.name.firstName()}`;
    const lastName = `${faker.name.firstName()}`;

    const handle = `${faker.random.word()}_${faker.name.firstName()}`.toLowerCase()
    const email = faker.internet.email()
    const bio = faker.lorem.paragraph()
    const profileImageUrl = faker.image.avatar()
    
    const user = `${firstName} = User(firstName="${firstName}", lastName="${lastName}", handle="${handle}", email="${email}", password="password", bio="${bio}", profileImageUrl="${profileImageUrl}")`
    
    console.log(user, '\n')
    i++
  }
}
// seedUsers(5);

const seedPosts = num => {
  for (let i = 0; i < num; i++) {
    let postImageURL = `https://mooa-seed.s3.amazonaws.com/seed/0${i + 1}-image.png`;
    const caption = faker.lorem.paragraph()

    const post = `post${i + 1} = Post(postImageURL="${postImageURL}", caption="${caption}")`
    
    console.log(post, ',');
  }
}
seedPosts(40)


const seedComments = num => {
  for (let i = 0; i < num; i++) {
    const postId = ~~(Math.random() * 40);
    const userId = ~~(Math.random() * 5);
    if (postId >= 112 || postId === 0) break;
    if (userId >= 51 || userId === 0) break;
    let caption;
    if (i % 2 === 0) caption = faker.lorem.sentence();
    else caption = faker.lorem.sentences(2);

    const like = {
      userId,
      postId,
      caption,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }

    console.log(like, ',');
  }

}
// seedComments(10);


const seedPostLikes = num => {
  for (let i = 0; i < num; i++) {
    const postId = ~~(Math.random() * 40) || 1;
    const userId = ~~(Math.random() * 5) || 1;
    if (postId >= 112 || postId === 0) break;
    if (userId >= 51 || userId === 0) break;


    const like = {
      userId,
      postId,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }

    console.log(like, ',');
  }
}
// seedPostLikes(70);
// !!! DON'T FORGET TO CHECK IF THERE ARE DUPLICATES AFTERWARDS !!!


const seedFollows = num => {
  for (let i = 0; i < num; i++) {
    const followerId = ~~(Math.random() * 5)
    const followedId = ~~(Math.random() * 5);
    if (followerId >= 112 || followerId === 0) break;
    if (followedId >= 51 || followedId === 0) break;


    const follow = {
      followerId,
      followedId,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }

    console.log(follow, ',');
    console.log('brug')
  }
}

// seedFollows(20)
// !!! DON'T FORGET TO CHECK IF THERE ARE DUPLICATES AFTERWARDS !!!




// const userObj = {}
// likes.forEach(like => {
//   if (!userObj[like.userId]) {
//     userObj[like.userId] = [like];
//   }
//   else {
//     if (!userObj[like.userId].find(like1 => like1.songId === like.songId)) {
//       userObj[like.userId].push(like);
//     }
//   }
// });

// const results = [];
// Object.values(userObj).forEach(arr => arr.forEach(like => results.push(like)))

// console.dir(results, { 'maxArrayLength': null });
