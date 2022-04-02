const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const seedUsers = num => {
  let i = 0;

  while (i < num) {
    let firstName;
    let lastName;
    if (i % 2 === 0) {
      firstName = `${faker.internet.firstName()}`;
      lastName = `${faker.internet.lastName()}`;
    }

    const user = {
      firstName,
      lastName,
      handle: `${faker.random.word()}_${faker.random}`,
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      bio: faker.lorem.paragraph(),
      profileImageUrl: faker.image.avatar(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }
    console.log(user, ',')
    i++
  }
}
// seedUsers(50);

const seedSongs = num => {
  for (let i = 0; i < num; i++) {
    let image;
    let word;
    if (i % 5 === 0) {
      image = faker.image.abstract();
      word = faker.random.word();
    } else if (i % 3 === 0) {
      image = faker.image.animals();
      word = faker.random.words();
    } else {
      image = faker.image.city();
      word = faker.lorem.word();
    }


    const user = {
      userId: (~~(Math.random() * 10)) * 5,
      // songURL: ,
      artworkURL: image,
      title: word,
      genre: faker.music.genre(),
      description: faker.lorem.sentence(),
      // duration: ,
      plays: faker.datatype.number(),
    }

    console.log(user, ',');
  }
}
// seedSongs(100)
// console.log((~~(Math.random() * 10)) * 5);


const seedLikes = num => {

  for (let i = 0; i < num; i++) {
    const songId = ~~(Math.random() * 112)
    const userId = ~~(Math.random() * 51);
    if (songId >= 112 || songId === 0) break;
    if (userId >= 51 || songId === 0) break;


    const like = {
      userId,
      songId,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }

    console.log(like, ',');
  }
}

// seedLikes(500);


const seedComments = num => {
  for (let i = 0; i < num; i++) {
    const songId = ~~(Math.random() * 112);
    const userId = ~~(Math.random() * 51);
    if (songId >= 112 || songId === 0) break;
    if (userId >= 51 || songId === 0) break;
    let content;
    if (i % 2 === 0) content = faker.lorem.sentence();
    else content = faker.lorem.sentences(2);

    const like = {
      content,
      userId,
      songId,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }

    console.log(like, ',');
  }

}
// seedComments(5000);





const likes = [
  {
    userId: 10,
    songId: 58,
    createdAt: "2021-11-04T14:10:40.319Z",
    updatedAt: "2021-06-23T21:54:59.477Z",
  },
  {
    userId: 29,
    songId: 84,
    createdAt: "2021-07-24T02:21:52.902Z",
    updatedAt: "2021-03-13T02:57:45.098Z",
  },
  {
    userId: 10,
    songId: 81,
    createdAt: "2021-05-28T07:29:09.681Z",
    updatedAt: "2022-03-08T11:37:17.149Z",
  },
  {
    userId: 26,
    songId: 97,
    createdAt: "2021-07-10T21:58:25.241Z",
    updatedAt: "2021-08-13T19:26:05.341Z",
  },
  {
    userId: 7,
    songId: 15,
    createdAt: "2021-03-25T00:36:59.952Z",
    updatedAt: "2021-12-13T01:41:52.802Z",
  },
  {
    userId: 41,
    songId: 72,
    createdAt: "2021-10-25T13:55:38.281Z",
    updatedAt: "2022-03-01T02:53:32.395Z",
  },
  {
    userId: 25,
    songId: 102,
    createdAt: "2021-05-04T14:16:12.707Z",
    updatedAt: "2022-01-07T08:30:46.621Z",
  },
  {
    userId: 2,
    songId: 82,
    createdAt: "2021-12-02T08:19:55.742Z",
    updatedAt: "2021-10-03T02:17:01.233Z",
  },
  {
    userId: 41,
    songId: 31,
    createdAt: "2021-08-24T05:08:15.632Z",
    updatedAt: "2021-08-30T19:23:33.858Z",
  },
  {
    userId: 9,
    songId: 88,
    createdAt: "2021-12-20T11:56:05.713Z",
    updatedAt: "2021-04-30T11:28:11.965Z",
  },
  {
    userId: 25,
    songId: 50,
    createdAt: "2022-01-26T17:59:15.049Z",
    updatedAt: "2021-05-31T08:00:03.014Z",
  },
  {
    userId: 1,
    songId: 46,
    createdAt: "2021-03-22T02:52:40.036Z",
    updatedAt: "2021-10-11T12:15:09.236Z",
  },
  {
    userId: 41,
    songId: 69,
    createdAt: "2021-10-03T12:58:06.892Z",
    updatedAt: "2022-02-24T02:07:54.129Z",
  },
  {
    userId: 24,
    songId: 90,
    createdAt: "2021-10-01T00:59:33.859Z",
    updatedAt: "2021-07-06T19:33:26.721Z",
  },
  {
    userId: 44,
    songId: 105,
    createdAt: "2021-09-23T04:36:14.987Z",
    updatedAt: "2021-05-05T16:04:01.074Z",
  },
  {
    userId: 17,
    songId: 37,
    createdAt: "2021-10-29T20:01:18.386Z",
    updatedAt: "2021-03-22T20:38:47.535Z",
  },
  {
    userId: 35,
    songId: 3,
    createdAt: "2021-06-05T06:20:24.469Z",
    updatedAt: "2021-12-25T20:11:22.020Z",
  },
  {
    userId: 1,
    songId: 74,
    createdAt: "2021-12-07T05:53:42.655Z",
    updatedAt: "2022-02-08T01:59:06.215Z",
  },
  {
    userId: 16,
    songId: 54,
    createdAt: "2022-02-27T01:08:02.727Z",
    updatedAt: "2021-08-27T10:46:49.187Z",
  },
  {
    userId: 16,
    songId: 20,
    createdAt: "2021-09-20T08:55:42.275Z",
    updatedAt: "2021-10-22T16:56:48.567Z",
  },
  {
    userId: 33,
    songId: 56,
    createdAt: "2021-06-01T01:45:21.753Z",
    updatedAt: "2022-02-28T21:34:58.193Z",
  },
  {
    userId: 32,
    songId: 11,
    createdAt: "2021-12-31T12:11:17.119Z",
    updatedAt: "2021-07-17T15:04:51.686Z",
  },
  {
    userId: 29,
    songId: 12,
    createdAt: "2022-01-09T08:08:29.127Z",
    updatedAt: "2021-09-10T15:55:54.135Z",
  },
  {
    userId: 31,
    songId: 14,
    createdAt: "2021-08-06T01:57:29.092Z",
    updatedAt: "2021-12-23T13:51:21.073Z",
  },
  {
    userId: 4,
    songId: 83,
    createdAt: "2021-07-28T10:12:22.106Z",
    updatedAt: "2022-03-04T09:50:51.674Z",
  },
  {
    userId: 31,
    songId: 36,
    createdAt: "2021-10-19T16:53:38.104Z",
    updatedAt: "2021-12-14T14:19:56.700Z",
  },
  {
    userId: 2,
    songId: 98,
    createdAt: "2021-05-24T14:44:12.605Z",
    updatedAt: "2021-11-30T23:23:50.443Z",
  },
  {
    userId: 14,
    songId: 84,
    createdAt: "2021-08-06T00:18:38.779Z",
    updatedAt: "2021-04-21T23:26:56.739Z",
  },
  {
    userId: 40,
    songId: 45,
    createdAt: "2021-07-02T09:38:49.487Z",
    updatedAt: "2021-06-23T22:48:36.299Z",
  },
  {
    userId: 8,
    songId: 12,
    createdAt: "2021-10-21T14:06:28.021Z",
    updatedAt: "2021-08-13T00:55:16.040Z",
  },
  {
    userId: 7,
    songId: 80,
    createdAt: "2021-11-15T19:19:24.393Z",
    updatedAt: "2021-03-11T15:09:51.435Z",
  },
  {
    userId: 28,
    songId: 36,
    createdAt: "2021-11-19T00:38:14.650Z",
    updatedAt: "2021-09-18T18:08:45.699Z",
  },
  {
    userId: 35,
    songId: 64,
    createdAt: "2021-09-26T19:02:18.170Z",
    updatedAt: "2021-07-31T16:28:10.434Z",
  },
  {
    userId: 49,
    songId: 73,
    createdAt: "2021-09-23T02:41:22.474Z",
    updatedAt: "2021-12-12T19:43:10.627Z",
  },
  {
    userId: 30,
    songId: 7,
    createdAt: "2021-10-16T12:30:13.860Z",
    updatedAt: "2021-12-12T00:28:25.224Z",
  },
  {
    userId: 37,
    songId: 74,
    createdAt: "2021-07-21T12:09:15.857Z",
    updatedAt: "2022-02-16T01:15:22.920Z",
  },
  {
    userId: 30,
    songId: 81,
    createdAt: "2021-08-22T18:26:48.518Z",
    updatedAt: "2021-09-21T03:00:49.772Z",
  },
  {
    userId: 11,
    songId: 30,
    createdAt: "2021-10-08T19:12:09.660Z",
    updatedAt: "2021-07-24T15:10:39.721Z",
  },
  {
    userId: 21,
    songId: 100,
    createdAt: "2022-02-13T12:16:05.274Z",
    updatedAt: "2021-09-03T11:15:00.256Z",
  },
  {
    userId: 34,
    songId: 22,
    createdAt: "2021-06-20T03:52:54.663Z",
    updatedAt: "2021-06-01T02:55:06.691Z",
  },
  {
    userId: 32,
    songId: 92,
    createdAt: "2022-01-08T02:41:20.174Z",
    updatedAt: "2022-01-12T03:59:47.670Z",
  },
  {
    userId: 48,
    songId: 20,
    createdAt: "2021-06-12T11:13:13.863Z",
    updatedAt: "2021-12-17T01:16:36.697Z",
  },
  {
    userId: 40,
    songId: 48,
    createdAt: "2022-01-19T08:12:47.004Z",
    updatedAt: "2022-02-16T21:47:55.058Z",
  },
  {
    userId: 15,
    songId: 67,
    createdAt: "2022-01-27T01:55:47.344Z",
    updatedAt: "2022-01-23T17:36:17.411Z",
  },
  {
    userId: 48,
    songId: 59,
    createdAt: "2021-09-20T06:35:46.415Z",
    updatedAt: "2021-11-15T23:18:31.557Z",
  },
  {
    userId: 5,
    songId: 71,
    createdAt: "2021-12-28T00:10:01.583Z",
    updatedAt: "2022-02-05T10:42:24.471Z",
  },
  {
    userId: 36,
    songId: 51,
    createdAt: "2021-10-20T04:57:01.363Z",
    updatedAt: "2022-02-27T09:42:13.273Z",
  },

  // hgyuvkblkj dhliafbjjvhlabfjdssjvlakbfsvbhlakbfjlvjkzhd

  {
    userId: 42,
    songId: 78,
    createdAt: "2021-07-09T18:00:23.106Z",
    updatedAt: "2021-07-17T07:54:53.018Z",
  },
  {
    userId: 16,
    songId: 107,
    createdAt: "2021-07-09T01:11:39.906Z",
    updatedAt: "2021-10-21T12:03:09.289Z",
  },
  {
    userId: 41,
    songId: 3,
    createdAt: "2021-09-22T17:06:19.066Z",
    updatedAt: "2021-08-07T01:41:51.329Z",
  },
  {
    userId: 14,
    songId: 22,
    createdAt: "2021-11-18T02:45:27.072Z",
    updatedAt: "2021-07-01T23:14:29.494Z",
  },
  {
    userId: 30,
    songId: 25,
    createdAt: "2021-06-27T14:47:52.871Z",
    updatedAt: "2021-06-10T14:58:56.079Z",
  },
  {
    userId: 43,
    songId: 43,
    createdAt: "2021-06-05T02:19:22.568Z",
    updatedAt: "2021-08-21T02:13:45.643Z",
  },
  {
    userId: 1,
    songId: 67,
    createdAt: "2021-10-21T17:14:57.629Z",
    updatedAt: "2021-10-27T10:20:48.106Z",
  },
  {
    userId: 29,
    songId: 34,
    createdAt: "2021-04-02T10:51:52.390Z",
    updatedAt: "2021-08-16T19:14:48.479Z",
  },
  {
    userId: 1,
    songId: 8,
    createdAt: "2021-05-09T10:12:00.017Z",
    updatedAt: "2021-07-21T22:34:17.900Z",
  },
  {
    userId: 50,
    songId: 97,
    createdAt: "2021-03-19T12:48:19.916Z",
    updatedAt: "2021-12-11T13:29:29.955Z",
  },
  {
    userId: 33,
    songId: 3,
    createdAt: "2021-09-09T11:42:46.254Z",
    updatedAt: "2021-12-25T03:41:45.936Z",
  },
  {
    userId: 33,
    songId: 52,
    createdAt: "2021-09-02T04:02:15.482Z",
    updatedAt: "2021-09-15T22:49:33.227Z",
  },
  {
    userId: 40,
    songId: 9,
    createdAt: "2021-04-04T06:25:46.844Z",
    updatedAt: "2021-12-17T10:04:35.593Z",
  },
  {
    userId: 42,
    songId: 33,
    createdAt: "2021-11-15T17:57:19.720Z",
    updatedAt: "2021-07-29T19:57:51.509Z",
  },
  {
    userId: 5,
    songId: 49,
    createdAt: "2022-01-21T14:13:47.464Z",
    updatedAt: "2021-05-06T17:54:58.109Z",
  },
  {
    userId: 4,
    songId: 81,
    createdAt: "2021-10-23T03:39:36.274Z",
    updatedAt: "2021-12-31T06:59:16.123Z",
  },
  {
    userId: 46,
    songId: 108,
    createdAt: "2021-11-29T00:49:09.904Z",
    updatedAt: "2021-07-13T05:36:17.329Z",
  },



  // a;ksjdfkajsbdfjanskdnjfkasdjfasd;fad 2
  {
    userId: 14,
    songId: 46,
    createdAt: "2022-02-12T00:48:45.273Z",
    updatedAt: "2021-04-29T16:48:04.728Z",
  },
  {
    userId: 30,
    songId: 111,
    createdAt: "2021-08-20T17:45:00.229Z",
    updatedAt: "2021-12-15T21:28:24.041Z",
  },
  {
    userId: 48,
    songId: 70,
    createdAt: "2022-02-24T05:28:35.980Z",
    updatedAt: "2021-09-30T19:30:29.949Z",
  },
  {
    userId: 27,
    songId: 77,
    createdAt: "2021-12-27T20:22:05.094Z",
    updatedAt: "2021-12-13T06:04:10.895Z",
  },
  {
    userId: 32,
    songId: 110,
    createdAt: "2021-12-20T13:57:47.195Z",
    updatedAt: "2021-11-21T00:00:02.180Z",
  },
  {
    userId: 31,
    songId: 12,
    createdAt: "2021-08-28T23:46:28.634Z",
    updatedAt: "2021-05-05T17:30:09.348Z",
  },
  {
    userId: 6,
    songId: 85,
    createdAt: "2021-12-31T14:30:52.454Z",
    updatedAt: "2021-09-30T03:17:54.977Z",
  },
  {
    userId: 5,
    songId: 95,
    createdAt: "2022-01-30T07:29:57.559Z",
    updatedAt: "2021-07-24T14:11:57.007Z",
  },
  {
    userId: 11,
    songId: 91,
    createdAt: "2022-02-01T12:42:14.035Z",
    updatedAt: "2021-03-29T23:24:25.927Z",
  },
  {
    userId: 35,
    songId: 3,
    createdAt: "2021-10-04T09:36:24.747Z",
    updatedAt: "2021-12-29T09:43:16.795Z",
  },
  {
    userId: 5,
    songId: 16,
    createdAt: "2021-04-14T14:24:01.520Z",
    updatedAt: "2022-02-11T01:35:26.571Z",
  },
  {
    userId: 48,
    songId: 66,
    createdAt: "2021-10-05T02:58:37.673Z",
    updatedAt: "2021-08-14T16:18:14.427Z",
  },
  {
    userId: 6,
    songId: 98,
    createdAt: "2022-01-13T06:44:50.350Z",
    updatedAt: "2021-07-08T06:27:04.156Z",
  },
  {
    userId: 46,
    songId: 92,
    createdAt: "2021-08-14T00:46:14.515Z",
    updatedAt: "2021-10-21T15:49:23.590Z",
  },
  {
    userId: 12,
    songId: 40,
    createdAt: "2022-01-23T04:47:57.104Z",
    updatedAt: "2022-03-02T11:14:46.350Z",
  },
  {
    userId: 30,
    songId: 24,
    createdAt: "2021-05-29T20:22:10.662Z",
    updatedAt: "2022-02-12T23:35:23.665Z",
  },
  {
    userId: 41,
    songId: 3,
    createdAt: "2021-08-01T18:44:52.780Z",
    updatedAt: "2022-02-17T05:14:16.079Z",
  },
  {
    userId: 47,
    songId: 35,
    createdAt: "2022-01-04T20:53:09.080Z",
    updatedAt: "2021-03-10T05:26:07.709Z",
  },
  {
    userId: 1,
    songId: 80,
    createdAt: "2022-01-01T15:46:49.652Z",
    updatedAt: "2021-08-21T21:48:11.753Z",
  },
  {
    userId: 22,
    songId: 17,
    createdAt: "2021-12-07T01:28:12.731Z",
    updatedAt: "2021-10-11T11:54:38.733Z",
  },
  {
    userId: 20,
    songId: 15,
    createdAt: "2021-06-13T00:25:45.006Z",
    updatedAt: "2022-02-06T18:03:08.038Z",
  },
  {
    userId: 5,
    songId: 71,
    createdAt: "2021-04-10T07:13:04.328Z",
    updatedAt: "2021-03-15T23:51:26.740Z",
  },
  {
    userId: 35,
    songId: 55,
    createdAt: "2021-11-23T02:20:15.877Z",
    updatedAt: "2021-10-02T14:28:38.541Z",
  },
  {
    userId: 34,
    songId: 106,
    createdAt: "2021-09-23T12:12:17.333Z",
    updatedAt: "2021-07-21T21:07:26.326Z",
  },
  {
    userId: 23,
    songId: 22,
    createdAt: "2021-05-21T12:33:56.446Z",
    updatedAt: "2021-03-30T23:01:04.093Z",
  },
  {
    userId: 5,
    songId: 5,
    createdAt: "2022-02-21T05:27:49.481Z",
    updatedAt: "2021-04-25T05:01:35.813Z",
  },
  {
    userId: 10,
    songId: 10,
    createdAt: "2022-01-26T21:26:01.231Z",
    updatedAt: "2021-03-27T02:13:27.453Z",
  },
  {
    userId: 1,
    songId: 85,
    createdAt: "2021-03-29T06:30:41.574Z",
    updatedAt: "2021-12-28T01:57:19.921Z",
  },
  {
    userId: 38,
    songId: 24,
    createdAt: "2021-10-09T11:43:30.000Z",
    updatedAt: "2021-06-20T10:25:48.112Z",
  },
  {
    userId: 1,
    songId: 16,
    createdAt: "2021-07-16T16:42:40.237Z",
    updatedAt: "2021-09-22T18:18:16.689Z",
  },
  {
    userId: 21,
    songId: 33,
    createdAt: "2021-06-30T10:27:39.134Z",
    updatedAt: "2021-04-25T23:44:54.161Z",
  },
  {
    userId: 49,
    songId: 38,
    createdAt: "2022-02-20T05:59:50.748Z",
    updatedAt: "2021-09-11T17:58:44.883Z",
  },
  {
    userId: 23,
    songId: 88,
    createdAt: "2021-06-28T04:53:28.953Z",
    updatedAt: "2021-07-08T10:16:19.630Z",
  },
  {
    userId: 15,
    songId: 32,
    createdAt: "2022-02-10T22:41:56.387Z",
    updatedAt: "2021-08-03T16:25:56.651Z",
  },
  {
    userId: 50,
    songId: 91,
    createdAt: "2021-04-24T09:08:45.072Z",
    updatedAt: "2021-05-21T08:44:39.783Z",
  },
  {
    userId: 16,
    songId: 55,
    createdAt: "2021-10-21T01:19:14.070Z",
    updatedAt: "2021-05-13T08:53:25.131Z",
  },
  {
    userId: 8,
    songId: 90,
    createdAt: "2021-06-01T15:56:44.152Z",
    updatedAt: "2021-09-30T04:50:40.870Z",
  },
  {
    userId: 5,
    songId: 40,
    createdAt: "2022-02-25T02:06:11.879Z",
    updatedAt: "2021-08-16T21:52:48.655Z",
  },
  {
    userId: 49,
    songId: 91,
    createdAt: "2021-04-11T03:55:50.723Z",
    updatedAt: "2021-04-10T23:50:19.473Z",
  },
  {
    userId: 42,
    songId: 28,
    createdAt: "2021-12-24T11:58:31.815Z",
    updatedAt: "2021-04-21T22:45:50.475Z"
  },
  {
    userId: 14,
    songId: 9,
    createdAt: "2021-04-03T11:31:32.577Z",
    updatedAt: "2021-12-26T13:48:24.591Z"
  },
  {
    userId: 45,
    songId: 23,
    createdAt: "2021-11-19T14:41:06.631Z",
    updatedAt: "2021-04-23T20:33:01.246Z"
  },
  {
    userId: 50,
    songId: 18,
    createdAt: "2021-04-07T15:56:24.674Z",
    updatedAt: "2021-05-24T11:07:18.319Z"
  },
  {
    userId: 3,
    songId: 52,
    createdAt: "2021-12-17T04:41:40.577Z",
    updatedAt: "2021-06-17T11:43:10.489Z"
  },
  {
    userId: 14,
    songId: 80,
    createdAt: "2021-03-30T14:19:18.586Z",
    updatedAt: "2022-03-14T18:50:02.870Z"
  },
  {
    userId: 46,
    songId: 42,
    createdAt: "2021-05-19T08:18:35.762Z",
    updatedAt: "2021-12-25T18:08:22.952Z"
  },
  {
    userId: 47,
    songId: 65,
    createdAt: "2022-02-18T12:01:19.039Z",
    updatedAt: "2021-11-05T17:02:29.299Z"
  },
  {
    userId: 8,
    songId: 45,
    createdAt: "2021-12-12T07:21:26.774Z",
    updatedAt: "2021-08-02T08:59:59.264Z"
  },
  {
    userId: 38,
    songId: 2,
    createdAt: "2021-10-15T17:49:51.094Z",
    updatedAt: "2021-05-10T02:15:27.169Z"
  },
  {
    userId: 28,
    songId: 41,
    createdAt: "2021-08-27T22:12:11.856Z",
    updatedAt: "2021-07-02T23:33:59.404Z"
  },
  {
    userId: 8,
    songId: 73,
    createdAt: "2022-03-13T11:26:53.285Z",
    updatedAt: "2021-03-28T09:12:01.527Z"
  },
  {
    userId: 2,
    songId: 68,
    createdAt: "2021-07-14T21:49:02.680Z",
    updatedAt: "2021-04-12T10:47:50.985Z"
  },
  {
    userId: 34,
    songId: 86,
    createdAt: "2022-02-24T16:30:29.909Z",
    updatedAt: "2022-01-27T14:40:20.256Z"
  },
  {
    userId: 20,
    songId: 14,
    createdAt: "2021-04-15T16:44:50.529Z",
    updatedAt: "2021-09-11T19:48:57.215Z"
  },
  {
    userId: 47,
    songId: 2,
    createdAt: "2021-06-21T15:08:29.669Z",
    updatedAt: "2021-07-29T22:07:34.645Z"
  },
  {
    userId: 14,
    songId: 56,
    createdAt: "2021-08-11T02:43:26.451Z",
    updatedAt: "2021-09-05T22:49:52.998Z"
  },
  {
    userId: 5,
    songId: 53,
    createdAt: "2022-03-07T15:47:20.431Z",
    updatedAt: "2021-04-23T01:40:47.013Z"
  },
  {
    userId: 1,
    songId: 47,
    createdAt: "2021-12-09T21:21:49.795Z",
    updatedAt: "2021-05-26T10:40:12.351Z"
  },
  {
    userId: 22,
    songId: 63,
    createdAt: "2021-08-03T20:44:36.910Z",
    updatedAt: "2021-04-11T05:34:44.823Z"
  },
  {
    userId: 48,
    songId: 107,
    createdAt: "2021-11-15T10:08:46.767Z",
    updatedAt: "2021-11-29T01:17:15.039Z"
  },
  {
    userId: 41,
    songId: 66,
    createdAt: "2021-04-19T08:34:18.906Z",
    updatedAt: "2021-07-23T12:28:54.835Z"
  },
  {
    userId: 45,
    songId: 31,
    createdAt: "2021-11-28T09:32:26.951Z",
    updatedAt: "2021-03-24T02:51:30.197Z"
  },
  {
    userId: 17,
    songId: 15,
    createdAt: "2021-04-15T23:14:31.323Z",
    updatedAt: "2022-02-04T20:29:10.801Z"
  },
  {
    userId: 31,
    songId: 77,
    createdAt: "2021-08-27T08:31:15.337Z",
    updatedAt: "2022-03-11T13:16:45.698Z"
  },
  {
    userId: 43,
    songId: 67,
    createdAt: "2021-05-16T21:53:49.699Z",
    updatedAt: "2022-01-10T07:38:26.240Z"
  },
  {
    userId: 43,
    songId: 86,
    createdAt: "2021-09-17T14:54:41.428Z",
    updatedAt: "2022-02-01T17:17:20.178Z"
  },
  {
    userId: 50,
    songId: 20,
    createdAt: "2022-01-20T18:51:25.251Z",
    updatedAt: "2022-02-08T23:47:30.616Z"
  },
  {
    userId: 31,
    songId: 9,
    createdAt: "2021-10-28T04:50:25.368Z",
    updatedAt: "2021-11-11T00:43:38.529Z"
  },
  {
    userId: 9,
    songId: 102,
    createdAt: "2021-12-07T13:20:51.745Z",
    updatedAt: "2021-09-29T15:00:48.676Z"
  },
  {
    userId: 48,
    songId: 2,
    createdAt: "2021-08-05T22:40:36.970Z",
    updatedAt: "2022-01-18T12:53:44.589Z"
  },
  {
    userId: 13,
    songId: 57,
    createdAt: "2021-12-20T03:18:03.154Z",
    updatedAt: "2021-08-31T02:24:09.692Z"
  },
  {
    userId: 8,
    songId: 85,
    createdAt: "2021-09-10T16:27:05.650Z",
    updatedAt: "2021-07-27T21:35:54.198Z"
  },
  {
    userId: 44,
    songId: 21,
    createdAt: "2021-11-21T11:22:44.366Z",
    updatedAt: "2021-08-26T21:36:50.407Z"
  },
  {
    userId: 32,
    songId: 90,
    createdAt: "2022-02-19T16:40:08.309Z",
    updatedAt: "2021-03-24T01:37:54.398Z"
  },
  {
    userId: 6,
    songId: 68,
    createdAt: "2021-09-03T15:08:38.824Z",
    updatedAt: "2021-07-09T12:49:08.639Z"
  },
  {
    userId: 10,
    songId: 81,
    createdAt: "2021-04-25T11:41:50.052Z",
    updatedAt: "2021-12-10T10:05:25.257Z"
  },
  {
    userId: 32,
    songId: 100,
    createdAt: "2021-07-01T11:56:42.619Z",
    updatedAt: "2022-02-27T08:51:19.501Z"
  },
  {
    userId: 17,
    songId: 94,
    createdAt: "2021-04-19T14:13:29.783Z",
    updatedAt: "2021-06-02T23:09:37.888Z"
  },
  {
    userId: 5,
    songId: 14,
    createdAt: "2021-04-30T19:28:24.127Z",
    updatedAt: "2021-04-09T08:18:29.052Z"
  },
  {
    userId: 35,
    songId: 109,
    createdAt: "2022-02-25T18:07:11.112Z",
    updatedAt: "2021-04-08T18:25:27.755Z"
  },
  {
    userId: 38,
    songId: 85,
    createdAt: "2021-08-23T23:43:19.445Z",
    updatedAt: "2022-01-31T21:28:47.940Z"
  },
  {
    userId: 22,
    songId: 60,
    createdAt: "2021-06-11T22:47:43.340Z",
    updatedAt: "2021-03-27T09:12:46.953Z"
  },
  {
    userId: 21,
    songId: 109,
    createdAt: "2022-02-19T15:12:21.846Z",
    updatedAt: "2022-01-06T21:44:51.638Z"
  },
  {
    userId: 5,
    songId: 83,
    createdAt: "2021-07-04T05:25:16.578Z",
    updatedAt: "2021-04-25T13:03:04.879Z"
  },
  {
    userId: 45,
    songId: 72,
    createdAt: "2021-09-03T06:59:54.330Z",
    updatedAt: "2021-10-14T17:29:19.365Z"
  },
  {
    userId: 29,
    songId: 86,
    createdAt: "2021-08-02T04:13:40.397Z",
    updatedAt: "2021-05-14T01:54:25.613Z"
  },
  {
    userId: 16,
    songId: 83,
    createdAt: "2021-11-28T06:47:21.880Z",
    updatedAt: "2022-03-03T16:40:11.323Z"
  },
  {
    userId: 20,
    songId: 3,
    createdAt: "2021-11-22T03:25:52.254Z",
    updatedAt: "2021-11-09T10:16:41.183Z"
  },
  {
    userId: 6,
    songId: 65,
    createdAt: "2022-01-26T13:55:50.152Z",
    updatedAt: "2022-02-09T23:01:57.230Z"
  },
  {
    userId: 22,
    songId: 108,
    createdAt: "2021-05-30T18:50:23.909Z",
    updatedAt: "2021-06-10T08:48:17.148Z"
  },
  {
    userId: 47,
    songId: 23,
    createdAt: "2021-10-26T07:46:47.876Z",
    updatedAt: "2021-09-17T05:47:09.687Z"
  },
  {
    userId: 6,
    songId: 88,
    createdAt: "2021-12-03T13:52:56.157Z",
    updatedAt: "2021-06-16T04:10:36.885Z"
  },
  {
    userId: 8,
    songId: 5,
    createdAt: "2021-06-20T00:26:51.315Z",
    updatedAt: "2021-11-03T21:49:27.402Z"
  },
  {
    userId: 13,
    songId: 23,
    createdAt: "2021-10-15T03:29:50.647Z",
    updatedAt: "2022-01-11T01:17:51.054Z"
  },
  {
    userId: 2,
    songId: 55,
    createdAt: "2022-03-03T02:50:34.832Z",
    updatedAt: "2021-10-06T04:29:07.894Z"
  },
  {
    userId: 3,
    songId: 111,
    createdAt: "2021-12-29T10:46:15.949Z",
    updatedAt: "2021-10-23T08:33:56.182Z"
  },
  {
    userId: 47,
    songId: 37,
    createdAt: "2021-06-09T10:58:22.630Z",
    updatedAt: "2021-05-24T16:50:21.843Z"
  },
  {
    userId: 42,
    songId: 32,
    createdAt: "2022-01-06T18:28:32.389Z",
    updatedAt: "2022-03-07T16:42:05.403Z"
  },
  {
    userId: 34,
    songId: 46,
    createdAt: "2021-12-30T21:21:38.232Z",
    updatedAt: "2022-01-09T01:09:50.573Z"
  },
  {
    userId: 14,
    songId: 110,
    createdAt: "2021-08-05T11:36:08.300Z",
    updatedAt: "2021-04-08T15:39:34.316Z"
  },
  {
    userId: 20,
    songId: 16,
    createdAt: "2022-03-02T14:49:25.739Z",
    updatedAt: "2022-02-22T04:53:12.076Z"
  },
  {
    userId: 16,
    songId: 107,
    createdAt: "2021-10-17T10:06:55.456Z",
    updatedAt: "2022-01-10T01:00:44.501Z"
  },
  {
    userId: 44,
    songId: 101,
    createdAt: "2021-08-10T02:18:52.014Z",
    updatedAt: "2021-03-21T03:23:19.330Z"
  },
  {
    userId: 10,
    songId: 88,
    createdAt: "2022-02-17T17:42:47.057Z",
    updatedAt: "2022-02-06T06:15:13.484Z"
  },
  {
    userId: 11,
    songId: 23,
    createdAt: "2021-09-01T06:18:36.318Z",
    updatedAt: "2022-03-06T07:57:36.217Z"
  },
  {
    userId: 16,
    songId: 2,
    createdAt: "2021-05-06T20:37:35.147Z",
    updatedAt: "2021-12-20T12:14:05.171Z"
  },
  {
    userId: 16,
    songId: 14,
    createdAt: "2021-03-26T17:54:39.643Z",
    updatedAt: "2021-05-09T13:16:00.549Z"
  },
  {
    userId: 29,
    songId: 98,
    createdAt: "2022-03-03T07:15:51.594Z",
    updatedAt: "2022-03-07T08:59:28.388Z"
  },
  {
    userId: 35,
    songId: 17,
    createdAt: "2021-04-19T08:51:42.337Z",
    updatedAt: "2022-01-29T11:12:26.911Z"
  },
  {
    userId: 23,
    songId: 15,
    createdAt: "2021-07-15T14:34:25.946Z",
    updatedAt: "2021-06-04T09:51:48.763Z"
  },
  {
    userId: 39,
    songId: 17,
    createdAt: "2021-11-11T18:16:54.702Z",
    updatedAt: "2021-05-02T19:12:41.624Z"
  },
  {
    userId: 26,
    songId: 20,
    createdAt: "2021-04-09T01:07:38.618Z",
    updatedAt: "2022-03-02T23:53:28.860Z"
  },
  {
    userId: 20,
    songId: 109,
    createdAt: "2021-07-01T20:49:01.878Z",
    updatedAt: "2021-05-15T08:39:26.874Z"
  },
  {
    userId: 37,
    songId: 68,
    createdAt: "2021-03-18T11:23:52.824Z",
    updatedAt: "2021-05-29T18:13:43.621Z"
  },
  {
    userId: 37,
    songId: 46,
    createdAt: "2021-09-26T15:28:34.323Z",
    updatedAt: "2021-08-17T12:01:04.319Z"
  },
  {
    userId: 40,
    songId: 67,
    createdAt: "2021-08-06T10:58:03.778Z",
    updatedAt: "2021-10-04T06:21:01.180Z"
  },
  {
    userId: 13,
    songId: 91,
    createdAt: "2021-05-23T08:53:37.300Z",
    updatedAt: "2021-12-21T02:17:34.500Z"
  },
  {
    userId: 15,
    songId: 40,
    createdAt: "2021-12-02T19:11:33.919Z",
    updatedAt: "2021-10-20T17:22:24.857Z"
  },
  {
    userId: 22,
    songId: 5,
    createdAt: "2021-04-16T16:27:20.705Z",
    updatedAt: "2021-11-22T09:08:08.691Z"
  },
  {
    userId: 23,
    songId: 91,
    createdAt: "2021-11-22T12:29:37.130Z",
    updatedAt: "2021-08-03T07:01:20.460Z"
  },
  {
    userId: 1,
    songId: 27,
    createdAt: "2022-02-17T12:13:37.171Z",
    updatedAt: "2021-11-02T13:12:20.723Z"
  },
  {
    userId: 24,
    songId: 10,
    createdAt: "2021-04-25T09:35:57.048Z",
    updatedAt: "2021-07-08T03:37:24.256Z"
  },
  {
    userId: 16,
    songId: 78,
    createdAt: "2022-03-10T19:54:37.043Z",
    updatedAt: "2022-02-03T14:22:32.617Z"
  },
  {
    userId: 35,
    songId: 18,
    createdAt: "2021-10-29T16:44:24.713Z",
    updatedAt: "2022-01-29T11:38:53.181Z"
  },
  {
    userId: 46,
    songId: 92,
    createdAt: "2021-12-03T19:06:46.202Z",
    updatedAt: "2021-07-09T07:29:05.394Z"
  },
  {
    userId: 45,
    songId: 52,
    createdAt: "2021-07-16T21:43:13.277Z",
    updatedAt: "2021-12-18T14:45:53.288Z"
  },
  {
    userId: 17,
    songId: 63,
    createdAt: "2022-02-27T09:03:49.766Z",
    updatedAt: "2021-09-09T09:53:17.281Z"
  },
  {
    userId: 50,
    songId: 103,
    createdAt: "2022-02-03T22:20:22.187Z",
    updatedAt: "2021-10-03T05:56:21.614Z"
  },
  {
    userId: 9,
    songId: 17,
    createdAt: "2021-09-22T12:22:05.929Z",
    updatedAt: "2022-03-01T20:40:31.406Z"
  },
  {
    userId: 12,
    songId: 56,
    createdAt: "2021-07-20T21:59:35.576Z",
    updatedAt: "2021-11-15T14:42:24.892Z"
  },
  {
    userId: 14,
    songId: 27,
    createdAt: "2021-06-26T08:39:09.882Z",
    updatedAt: "2021-11-29T12:33:35.240Z"
  },

]

const userObj = {}
likes.forEach(like => {
  if (!userObj[like.userId]) {
    userObj[like.userId] = [like];
  }
  else {
    if (!userObj[like.userId].find(like1 => like1.songId === like.songId)) {
      userObj[like.userId].push(like);
    }
  }
});

const results = [];
Object.values(userObj).forEach(arr => arr.forEach(like => results.push(like)))

console.dir(results, { 'maxArrayLength': null });



const songURLS = [
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/amazing-grace-of-christmas-11162.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/ambient-cinematic-hip-hop-22168.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/ambient-piano-10781.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/ambient-piano-amp-strings-10711.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/angel-piano-main-9625.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/battle-of-the-dragons-8037.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/both-of-us-14037.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/chill-abstract-intention-12099.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/chilled-acoustic-indie-folk-instrumental-background-music-for-videos-5720.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/cinematic-atmosphere-score-2-22136.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/cinematic-dramatic-11120.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/cinematic-fairy-tale-story-main-8697.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/electronic-rock-king-around-here-15045.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/embrace-12278.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/emotional-piano-sad-background-music-for-videos-5688.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/epic-hollywood-trailer-9489.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/everything-feels-new-15241.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/everything-feels-new-15241.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/forest-story-acoustic-ambient-background-music-9713.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/forget-16026.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/freshness-15706.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/honor-and-sword-main-11222.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/in-the-forest-ambient-acoustic-guitar-instrumental-background-music-for-videos-5718.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/inspiring-cinematic-background-music-for-videos-5717.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/inspiring-epic-cinematic-mood-13556.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/inspiring-epic-cinematic-mood-13556.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/inspiring-epic-cinematic-mood-13556.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/just-relax-11157.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/let-it-go-12279.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/melody-of-nature-main-6672.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/mindfulness-relaxation-amp-meditation-music-22174.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/moment-14023.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/morning-garden-acoustic-chill-15013.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/motivation-epic-inspire-14064.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/nightlife-michael-kobrin-95bpm-3783.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/out-of-time-15474.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/penguinmusic-modern-chillout-12641.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/piano-ambience-relax-12447.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/piano-moment-9835.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/price-of-freedom-33106.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/second-wind-13465.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/sexy-fashion-beats-simulate-11176.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/simple-piano-melody-9834.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/slow-trap-18565.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/spirit-blossom-15285.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/the-cradle-of-your-soul-15700.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/the-epic-trailer-12955.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/the-introvert-michael-kobrin-10959.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/the-way-home-6674.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds/this-minimal-technology-pure-12327.mp3",
]

const songURLS2 = [
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/3+am+West+End.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Advertime.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Ambient+Bongos.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/And+Just+Like+That.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Aquatic+City+Vanished.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Arpent.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Backbeat.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Bar+Brawl.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Bavarian+Seascape.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Be+Chillin.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Be+Jammin.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Beat+One.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Beat+Thee.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Bit+Bit+Loop.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Blacksmith.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Blood+Eagle.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Bollywood+Groove.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Bonfire.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Breaking+Bollywood.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Chronos.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/City+Sunshine.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Connecting+Rainbows.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Coy+Koi.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Cumbish.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Del+Rio+Bravo.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Desert+Conflict.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Experimental+Test+Subject.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Eye+of+Forgiveness.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Favorite.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Fireworks.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Forest+Frolic+Loop.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/From+Page+to+Practice.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Funshine.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Goodnightmare.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Happy+Whistling+Ukulele.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Hear+What+They+Say.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Hillbilly+Swing.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Hippety+Hop.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Inspiration.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Inventing+Flight.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Limit+70.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Meditating+Beat.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Motions.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Pickled+Pink.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Relaxing+Ballad.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Screen+Saver.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Space+Ambience.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Stereotype+News.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Still+Pickin.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Ukulele+Song.mp3",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/audio-for-song-seeds-2/Ukulele+Song.mp3",
]

const artworkURLS = [
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/adrianna-geo-1rBg5YSi00c-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/alexander-andrews-fsH1KjbdjE8-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/alexandru-acea-RQgKM1h2agA-unsplash+(1).jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/alexandru-acea-RQgKM1h2agA-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/alina-grubnyak-IsxaFsXi2rs-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/anna-kolosyuk-D5nh6mCW52c-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/baptiste-xwqonFkbqRE-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/birmingham-museums-trust-hEPmVFvF3Hs-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/camylla-battani-A5E-ym6WyGM-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/dalton-denomme-ikTOTLuT3Xk-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/dan-farrell-fT49QnFucQ8-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/davisuko-2FdIvx7sy3U-unsplash+(1).jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/debby-hudson-MzSqFPLo8CE-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/eberhard-grossgasteiger-mguOI30Cfs8-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/efe-kurnaz-RnCPiXixooY-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/emile-seguin-R9OueKOtGGU-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/europeana-5TK1F5VfdIk-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/fabrice-villard-Jrl_UQcZqOc-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/henrik-donnestad-t2Sai-AqIpI-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/jaclyn-moy-6kbFSu5EvU0-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/jake-blucker-tMzCrBkM99Y-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/jene-stephaniuk--MCrF6hnojU-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/jeremy-thomas-rMmibFe4czY-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/jon-tyson-9sR0K4D1gNQ-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/jon-tyson-WB9TRkyrlzk-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/josh-rose-trYl7JYATH0-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/jr-korpa-JKRL7ofWWAA-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/laura-vinck-Hyu76loQLdk-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/markus-spiske-k0rVudBoB4c-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/meagan-carsience-txThZOwDrCs-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/michele-caliani-iLAAT1E-H_8-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/namroud-gorguis-FZWivbri0Xk-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/osarugue-igbinoba-iEKeM1bwPlI-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/osman-rana-dI9KhXi0ooE-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/patrick-tomasso-QMDap1TAu0g-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/pavel-nekoranec-I__QKQLMIKs-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/rhondak-native-florida-folk-artist-_Yc7OtfFn-0-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/robert-keane-rlbG0p_nQOU-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/ryan-ancill-aJYO8JmVodY-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/scott-rodgerson-z0MDyylvY1k-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/sebastian-svenson-d2w-_1LJioQ-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/seyi-ariyo-6YgYRcyQK_s-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/steve-johnson-3Sf_G9m0gcQ-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/steve-johnson-5MTf9XyVVgM-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/stormseeker-rX12B5uX7QM-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/surface-nC35efkdYBg-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/timon-klauser-3MAmj1ZKSZA-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/usgs-hoS3dzgpHzw-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/victor-grabarczyk-wN9DU73b8_s-unsplash.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds/warren-wong-bh4LQHcOcxE-unsplash.jpg",
]

const artworkURLS2 = [
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-ali-%C5%9Fenol-9334434.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-amber-janssens-7194486.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-andrea-piacquadio-3758113.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-anete-lusina-6354250.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-ann-h-1878399.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-beytlik-9289070.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-bruno-pires-10164553.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-charles-parker-6647489.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-charles-wundengba-3609781.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-cottonbro-4056472.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-cottonbro-4690299.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-dimitry-anikin-5044497.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-disha-sheta-2870928.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-disha-sheta-3112907.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-egor-kamelev-813872.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-elle-hughes-3513221.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-emmy-paw-5461428.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-eugene-liashchevskyi-9138068.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-karolina-1200502.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-karolina-grabowska-4467151.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-kristin-vogt-54200.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-ksenia-chernaya-4048680.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-lisa-fotios-10730484.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-lisa-fotios-11274650.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-lisa-fotios-2882770.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-loc-dang-5267780.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-lumn-167699.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-maryia-plashchynskaya-8003109.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-matteo-badini-9365604.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-mikegles-11384156.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-nikita-igonkin-11254088.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-nurlan-tortbayev-10283734.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-nurlan-tortbayev-10369698.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-nyara-aquino-3108920.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-olya-kobruseva-6495848.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-olya-kobruseva-6495856.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-pixabay-235621.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-radu-andrei-razvan-773594.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-ruvim-miksanskiy-1438761.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-saliha-7819309.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-simon-berger-688660.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-spencer-davis-5772681.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-tara-winstead-6489667.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-vika-kirillova-11354017.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-vyacheslav-bobin-9906385.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-yaroslava-borz-10153603.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-yelena-odintsova-10262372.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-%D0%B5%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9-%D0%BA%D0%B0%D1%87%D0%B8%D0%BD-9940538.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-%D0%B5%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9-%D0%BA%D0%B0%D1%87%D0%B8%D0%BD-9940538.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-%D0%B5%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9-%D0%BA%D0%B0%D1%87%D0%B8%D0%BD-9940538.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/royalty-free-song-seeds/artwork-for-song-seeds-2/pexels-%D0%B5%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9-%D0%BA%D0%B0%D1%87%D0%B8%D0%BD-9940538.jpg",
]

const bannerURLS = [
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-aldiyar-seitkassymov-3100836.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-andre-moura-2523959.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-anni-roenkae-2156881.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-anni-roenkae-2156883.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-anni-roenkae-2156884.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-anni-roenkae-2317710.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-anni-roenkae-2317711.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-anni-roenkae-2317742.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-anni-roenkae-2693208.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-anni-roenkae-2693212.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-anni-roenkae-2860807.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-anni-roenkae-3435272.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-ave-calvar-martinez-4279013.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-bruno-thethe-1910225.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-bruno-thethe-1910229.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-bruno-thethe-1910230.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-bruno-thethe-1910231.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-bruno-thethe-1910236.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-damir-mijailovic-3651579.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-doni-haris-2968939.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-emre-can-acer-2110951.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-evie-shaffer-3357695.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-fiona-art-3208282.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-fiona-art-5022847.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-fiona-art-5022849.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-fiona-art-5186869.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-frank-cone-3573555.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-ivy-son-3490393.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-ivy-son-3490887.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-jot-2179483.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-karolina-grabowska-4046718.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-kristina-paukshtite-1998922.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-loc-dang-5253574.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-luca-nardone-3784143.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-luis-quintero-2471234.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-miriam-espacio-2694037.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-mnm-zameer-3308588.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-mudassir-ali-3127409.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-mudassir-ali-3577391.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-reza-fahlevi-2699282.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-rodrigo-souza-2531608.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-roman-odintsov-4871011.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-stacey-gabrielle-koenitz-rozells-2425011.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-stacey-gabrielle-koenitz-rozells-2425036.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-stacey-gabrielle-koenitz-rozells-2425232.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-tom-swinnen-2249961.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-tuesday-temptation-3780104.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-uzunov-rostislav-5109305.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-velroy-fernandes-4068339.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-vlad-che%C8%9Ban-2892606.jpg",
  "https://supercloud-bucket.s3.amazonaws.com/user-seeds/banners-for-user-seeds/pexels-vlad-che%C8%9Ban-2892606.jpg",
]
