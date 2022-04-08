from app.models import db, Thread

def seed_threads():
    thread1 = Thread(name='Thread 1')
    thread2 = Thread(name='Thread 2')
    thread3 = Thread(name='Thread 3')
    thread4 = Thread(name='Thread 4')
    thread5 = Thread(name='Thread 5')
    thread6 = Thread(name='Thread 6')
    thread7 = Thread(name='Thread 7')

    threads = [thread1, thread2, thread3, thread4, thread5,
                thread6, thread7]

    for thread in threads:
        db.session.add(thread)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_threads():
    db.session.execute('TRUNCATE threads RESTART IDENTITY CASCADE;')
    db.session.commit()
