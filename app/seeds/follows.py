from app.models import db, Follow

def seed_follows():
    # TODO: put follow seeds here

    follows = []

    for follow in follows:
        db.session.add(follow)

    db.session.commit()


def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
