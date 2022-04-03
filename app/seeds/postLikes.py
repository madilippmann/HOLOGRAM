from app.models import db, Post

def seed_posts():




    for like in likes:
        db.session.add(like)

    db.session.commit()
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
