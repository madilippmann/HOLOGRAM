from app.models import db, Thread, User

def seed_users_threads():
    # User.query.get(1).threads.append(Thread.query.get(2))
    user1 = User.query.get(1)
    thread1 = Thread.query.get(2)
    user1.threads.append(thread1)

    # User.query.get(2).threads.append(Thread.query.get(6))
    user2 = User.query.get(1)
    thread2 = Thread.query.get(6)
    user2.threads.append(thread2)

    # User.query.get(3).threads.append(Thread.query.get(1))
    user3 = User.query.get(2)
    thread3 = Thread.query.get(1)
    user3.threads.append(thread3)

    # User.query.get(4).threads.append(Thread.query.get(5))
    user4 = User.query.get(4)
    thread4 = Thread.query.get(4)
    user4.threads.append(thread4)

    # User.query.get(1).threads.append(Thread.query.get(4))
    user5 = User.query.get(1)
    thread5 = Thread.query.get(4)
    user5.threads.append(thread5)


    user6 = User.query.get(3)
    thread6 = Thread.query.get(3)
    user6.threads.append(thread6)

    # User.query.get(1).threads.append(Thread.query.get(3))
    user7 = User.query.get(1)
    thread7 = Thread.query.get(3)
    user7.threads.append(thread7)

    # User.query.get(4).threads.append(Thread.query.get(7))
    user8 = User.query.get(1)
    thread8 = Thread.query.get(7)
    user8.threads.append(thread8)

    # User.query.get(5).threads.append(Thread.query.get(7))
    user11 = User.query.get(7)
    thread11 = Thread.query.get(7)
    user11.threads.append(thread11)

    # User.query.get(1).threads.append(Thread.query.get(5))
    user12 = User.query.get(1)
    thread12 = Thread.query.get(5)
    user12.threads.append(thread12)

    # User.query.get(6).threads.append(Thread.query.get(5))
    user13 = User.query.get(6)
    thread13 = Thread.query.get(5)
    user13.threads.append(thread13)

    # User.query.get(1).threads.append(Thread.query.get(2))
    user14 = User.query.get(1)
    thread14 = Thread.query.get(1)
    user14.threads.append(thread14)

    user15 = User.query.get(3)
    thread15 = Thread.query.get(2)
    user15.threads.append(thread15)

    user16 = User.query.get(4)
    thread16 = Thread.query.get(2)
    user16.threads.append(thread16)

    user18 = User.query.get(5)
    thread18 = Thread.query.get(6)
    user18.threads.append(thread18)


    db.session.commit()



def undo_users_threads():
    db.session.execute('TRUNCATE users_threads RESTART IDENTITY CASCADE;')
    db.session.commit()
