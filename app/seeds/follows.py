from app.models import db, Follow

def seed_follows():
    follow1 = Follow(followerId="6", followedId="2")
    follow2 = Follow(followerId="2", followedId="4") 
    follow3 = Follow(followerId="6", followedId="5") 
    follow4 = Follow(followerId="2", followedId="6") 
    follow6 = Follow(followerId="1", followedId="5") 
    follow7 = Follow(followerId="5", followedId="4") 
    follow8 = Follow(followerId="4", followedId="3") 
    follow9 = Follow(followerId="3", followedId="4") 
    follow10 = Follow(followerId="1", followedId="2") 
    follow12 = Follow(followerId="3", followedId="7") 
    follow13 = Follow(followerId="7", followedId="6") 
    follow16 = Follow(followerId="4", followedId="2") 
    follow17 = Follow(followerId="4", followedId="6") 
    follow18 = Follow(followerId="6", followedId="1") 
    follow20 = Follow(followerId="3", followedId="1") 
    follow21 = Follow(followerId="7", followedId="5") 
    follow23 = Follow(followerId="5", followedId="2") 
    follow24 = Follow(followerId="5", followedId="6") 
    follow25 = Follow(followerId="6", followedId="3") 
    follow27 = Follow(followerId="1", followedId="7") 
    follow28 = Follow(followerId="7", followedId="4") 
    follow32 = Follow(followerId="3", followedId="5") 
    follow33 = Follow(followerId="2", followedId="7") 
    follow34 = Follow(followerId="5", followedId="1") 
    follow36 = Follow(followerId="4", followedId="7") 
    follow37 = Follow(followerId="2", followedId="3") 
    follow42 = Follow(followerId="7", followedId="3") 
    follow48 = Follow(followerId="3", followedId="6") 

    follows = [
        follow1, follow2, follow3, follow4, follow6, follow7, follow8,
        follow9, follow10, follow12, follow13, follow16, follow17, follow18,
        follow20, follow21, follow23, follow24, follow25, follow27, follow28,
        follow32, follow33, follow34, follow36, follow37, follow42, follow48
    ]

    for follow in follows:
        db.session.add(follow)

    db.session.commit()


def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
