from app.models import db, Thread, User

def seed_users_threads():
    User.query.get(1).users_threads.append(Thread.query.get(2))
    User.query.get(2).users_threads.append(Thread.query.get(6))

    User.query.get(1).users_threads.append(Thread.query.get(2))
    User.query.get(3).users_threads.append(Thread.query.get(1))
    User.query.get(4).users_threads.append(Thread.query.get(5))

    User.query.get(1).users_threads.append(Thread.query.get(4))
    User.query.get(3).users_threads.append(Thread.query.get(1))

    User.query.get(1).users_threads.append(Thread.query.get(3))
    User.query.get(4).users_threads.append(Thread.query.get(7))

    User.query.get(1).users_threads.append(Thread.query.get(4))
    User.query.get(6).users_threads.append(Thread.query.get(4))

    User.query.get(1).users_threads.append(Thread.query.get(3))
    User.query.get(5).users_threads.append(Thread.query.get(7))

    User.query.get(1).users_threads.append(Thread.query.get(5))
    User.query.get(6).users_threads.append(Thread.query.get(5))


    db.session.commit()


def undo_users_threads():
    db.session.execute('TRUNCATE users_threads RESTART IDENTITY CASCADE;')
    db.session.commit()
