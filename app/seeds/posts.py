from app.models import db, Posts

def seed_posts():


    posts = []

    for post in posts:
        db.session.add(post)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()


'''
{
  firstName: 'Eulalia',
  lastName: 'Marjory',
  handle: 'officer_fern',
  email: 'Abdul90@yahoo.com',
  hashedPassword: '$2a$10$a9KjHjne0jAaJoB7yplkKuZ0.p3hAKCvoB0dVnmmzltgLoWeZFsaa',
  bio: 'Nihil excepturi eveniet excepturi illo veritatis est voluptatem minima. Ab esse nobis animi non et cupiditate similique suscipit. Nihil vitae est omnis enim a reprehenderit impedit ex qui. Iusto quae eos dolores minus nemo vero et id. Animi sit sed pariatur qui sequi. Minus voluptatem quis vero autem soluta at.',
  profileImageUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/194.jpg',
  createdAt: 2021-04-30T07:57:15.320Z,
  updatedAt: 2021-07-26T15:18:02.115Z
} ,
{
  firstName: 'Kurt',
  lastName: 'Raquel',
  handle: 'iran_winfield',
  email: 'Russ_Lueilwitz@yahoo.com',
  hashedPassword: '$2a$10$92/NpKHMuph0RE4B4YUuouWCgt3tKCP16enhEv/rdLLajE.XKPkZO',
  bio: 'Ea nobis quod aliquid repellat eum. Commodi est veritatis doloremque. Pariatur sed autem quaerat repellat reiciendis. Ducimus et consequatur consequatur error.',
  profileImageUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/433.jpg',
  createdAt: 2021-12-04T10:57:14.401Z,
  updatedAt: 2021-08-19T07:55:38.932Z
} ,
{
  firstName: 'Freddie',
  lastName: 'Zelma',
  handle: 'metal_lambert',
  email: 'Marques_Reichel@yahoo.com',
  hashedPassword: '$2a$10$hjoXy//zqn4uJ8dIfGZdzOS2VVPQbXUQNgXkHSe5ocE7LFq00Ktw6',
  bio: 'Pariatur eum vel velit qui nobis maxime. Eligendi sint nam. Architecto maxime esse nulla nemo odio iste facere odio. Voluptatem illo facilis quam quia. Nesciunt assumenda veritatis. A quas nihil sunt iusto quis rerum dolor.',
  profileImageUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/551.jpg',
  createdAt: 2021-12-10T11:36:07.977Z,
  updatedAt: 2021-12-19T04:29:30.995Z
} ,
{
  firstName: 'Keara',
  lastName: 'Quincy',
  handle: 'brand_ova',
  email: 'Margret33@hotmail.com',
  hashedPassword: '$2a$10$/2xPVTvkuWgeDCZKfhMQTOerS2glYek4SrXIaVs5NjWTYvivz7FLG',
  bio: 'Odio impedit maxime magni dolorum. Aspernatur sequi non. Molestiae quae modi eaque ducimus voluptate earum deserunt voluptatem. Et rerum ab dignissimos omnis. Veritatis est reprehenderit fugiat expedita quis quibusdam. Maxime magnam ad consequatur sunt est.',
  profileImageUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/345.jpg',
  createdAt: 2021-10-30T15:08:34.460Z,
  updatedAt: 2021-05-10T01:07:54.007Z
} ,
{
  firstName: 'Cedrick',
  lastName: 'Colby',
  handle: 'orchestrator_rowena',
  email: 'Viola46@hotmail.com',
  hashedPassword: '$2a$10$xqeEkAKHbCAwEF.LMmEqhe.UCuIgeyfWzZrSShDpLKtHYSMQqPP4G',
  bio: 'Corrupti aliquid magni enim mollitia omnis eum modi. Facere animi voluptatem ducimus est nesciunt. Libero necessitatibus in nam amet. Deleniti quis quo inventore consequatur tempora et sint enim.',
  profileImageUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/950.jpg',
  createdAt: 2021-12-24T06:28:51.911Z,
  updatedAt: 2021-11-02T03:45:35.361Z
}
'''
