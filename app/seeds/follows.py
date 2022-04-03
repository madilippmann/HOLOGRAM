from app.models import db, follows, User

def seed_follows():
    User.query.get(4).followers.append(User.query.get(2))
    User.query.get(5).followers.append(User.query.get(6))
    User.query.get(6).followers.append(User.query.get(2))
    User.query.get(5).followers.append(User.query.get(1))
    User.query.get(4).followers.append(User.query.get(5))
    User.query.get(3).followers.append(User.query.get(4))
    User.query.get(2).followers.append(User.query.get(1))
    User.query.get(7).followers.append(User.query.get(3))
    User.query.get(6).followers.append(User.query.get(7))
    User.query.get(2).followers.append(User.query.get(4))
    User.query.get(6).followers.append(User.query.get(4))
    User.query.get(1).followers.append(User.query.get(3))
    User.query.get(5).followers.append(User.query.get(7))
    User.query.get(2).followers.append(User.query.get(5))
    User.query.get(6).followers.append(User.query.get(5))
    User.query.get(3).followers.append(User.query.get(6))
    User.query.get(7).followers.append(User.query.get(1))
    User.query.get(4).followers.append(User.query.get(7))
    User.query.get(5).followers.append(User.query.get(3))
    User.query.get(7).followers.append(User.query.get(2))
    User.query.get(1).followers.append(User.query.get(5))
    User.query.get(7).followers.append(User.query.get(4))
    User.query.get(3).followers.append(User.query.get(2))
    User.query.get(3).followers.append(User.query.get(7))
    User.query.get(6).followers.append(User.query.get(3))

    db.session.commit()


def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
