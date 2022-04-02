from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName='Demo', lastName='User', handle='demo', email='demo@aa.io', password='password', privateStatus=False)
    marnie = User(
        firstName='Marnie', lastName='Marnie', handle='marnie', email='marnie@aa.io', password='password', privateStatus=False)
    bobbie = User(
        firstName='Bobby', lastName='McFerrin', handle='bobbie', email='bobbie@aa.io', password='password', privateStatus=False)

    landen = User(firstName="Landen", lastName="Nat", handle="systems_annabelle", email="Aaliyah5@hotmail.com", password='password', bio="Repellendus quo sit est voluptatem est ratione qui sequi quos. Voluptate consequatur exercitationem ea itaque non qui sed voluptatem tenetur. Ab praesentium magnam.", profileImageUrl="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1.jpg", privateStatus=False)

    chelsea = User(firstName="Chelsea", lastName="Patricia", handle="interface_asha", email="Oma.Keebler46@hotmail.com", password='password', bio="Voluptatibus cum est dicta mollitia. Incidunt ratione ipsa voluptatem et quia saepe omnis eaque nulla. Possimus sed ut molestiae error quas debitis. Consequatur aut qui. Magnam eum reiciendis molestiae qui qui.", profileImageUrl="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/265.jpg", privateStatus=False)

    theresia = User(firstName="Theresia", lastName="Toni", handle="array_domenico", email="Vesta_Kautzer50@gmail.com", password='password', bio="Provident sunt fugit velit et laudantium est cum in. Voluptatem ut voluptatem sit. Quam harum dolorum quo voluptas culpa eveniet qui. Molestias fuga sit rerum.", profileImageUrl="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1155.jpg", privateStatus=False)

    clement = User(firstName="Clement", lastName="Jan", handle="firewall_irwin", email="Fidel49@hotmail.com", password='password', bio="Et dicta recusandae enim perspiciatis quasi id. Voluptatibus facilis est atque. Vero et magnam ut voluptate alias aliquam accusantium. Dicta dolore exercitationem in voluptatem ut illo vel voluptatum rerum.", profileImageUrl="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/638.jpg", privateStatus=False)

    kayleigh = User(firstName="Kayleigh", lastName="Rupert", handle="baby_columbus", email="Brendan.Kub@hotmail.com", password='password', bio="Deleniti illo voluptas quia commodi. Sapiente in cum. Iure consequatur magnam non minus. Praesentium omnis est nostrum quae suscipit recusandae. Est et tempore praesentium rerum exercitationem.", profileImageUrl="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/111.jpg", privateStatus=False)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(landen)
    db.session.add(chelsea)
    db.session.add(theresia)
    db.session.add(clement)
    db.session.add(kayleigh)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
