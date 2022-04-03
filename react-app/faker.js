const { faker } = require('@faker-js/faker');

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
    let postImageUrl = `https://mooa-seed.s3.amazonaws.com/seed/0${i + 1}-image.png`;
    const caption = faker.lorem.paragraph()

    const post = `post${i + 1} = Post(postImageUrl="${postImageUrl}", caption="${caption}")`

    console.log(post, ',');
  }
}
// seedPosts(40)


const seedComments = num => {
  for (let i = 0; i < num; i++) {
    const postId = ~~(Math.random() * 40) || 1;
    const userId = ~~(Math.random() * 5) || 1;
    if (postId >= 112 || postId === 0) continue;
    if (userId >= 51 || userId === 0) continue;
    let caption;
    if (i % 2 === 0) caption = faker.lorem.sentence();
    else caption = faker.lorem.sentences(2);

    const comment = `comment${i + 1} = Comment(postId="${postId}", userId="${userId}", content="${caption}")`

    console.log(comment, '\n');
  }
}
seedComments(30);


let postLikePairs = []
const seedPostLikes = num => {
  for (let i = 0; i < num; i++) {
    const postId = ~~(Math.random() * 40) || 1;
    const userId = ~~(Math.random() * 5) || 1;
    if (postId >= 112 || postId === 0) continue;
    if (userId >= 51 || userId === 0) continue;
    
    const duplicate = postLikePairs.find(like => like.userId === userId && like.postId === postId);
    if (duplicate) continue;
    postLikePairs.push({ postId, userId });

    const postLike = `postLike${i + 1} = PostLike(postId="${postId}", userId="${userId}")`;

    console.log(postLike, '\n');
  }
}
// seedPostLikes(50);


const followPairs = [];
const seedFollows = num => {
  for (let i = 0; i < num; i++) {
    const followerId = ~~(Math.random() * 8)
    const followedId = ~~(Math.random() * 8);
    if (followerId >= 112 || followerId === 0) continue;
    if (followedId >= 51 || followedId === 0) continue;

    const duplicate = followPairs.find(follow => follow.followerId === followerId && follow.followedId === followedId);
    if (duplicate || followerId === followedId) continue;
    followPairs.push({ followerId, followedId });

    const follow = `follow${i + 1} = Follow(followerId="${followerId}", followedId="${followedId}")`;

    console.log(follow, '\n');
  }
}
// seedFollows(50)
