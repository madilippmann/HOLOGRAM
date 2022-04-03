from app.models import db, PostLike

def seed_postLikes():
    like1 = PostLike(postId="11", userId="2")
    like2 = PostLike(postId="6", userId="1")
    like3 = PostLike(postId="28", userId="1")
    like4 = PostLike(postId="9", userId="2")
    like5 = PostLike(postId="1", userId="4")
    like6 = PostLike(postId="22", userId="1")
    like7 = PostLike(postId="33", userId="4")
    like8 = PostLike(postId="24", userId="1")
    like9 = PostLike(postId="30", userId="4")
    like10 = PostLike(postId="36", userId="3")
    like11 = PostLike(postId="2", userId="3")
    like12 = PostLike(postId="25", userId="1")
    like14 = PostLike(postId="23", userId="1")
    like15 = PostLike(postId="9", userId="1")
    like16 = PostLike(postId="28", userId="3")
    like17 = PostLike(postId="35", userId="4")
    like18 = PostLike(postId="18", userId="3")
    like19 = PostLike(postId="1", userId="3")
    like22 = PostLike(postId="4", userId="1")
    like24 = PostLike(postId="18", userId="4")
    like25 = PostLike(postId="20", userId="4")
    like27 = PostLike(postId="18", userId="2")
    like28 = PostLike(postId="2", userId="4")
    like29 = PostLike(postId="6", userId="3")
    like30 = PostLike(postId="33", userId="1")
    like32 = PostLike(postId="11", userId="4")
    like33 = PostLike(postId="12", userId="4")
    like34 = PostLike(postId="37", userId="1")
    like35 = PostLike(postId="39", userId="4")
    like36 = PostLike(postId="20", userId="1")
    like37 = PostLike(postId="12", userId="1")
    like39 = PostLike(postId="29", userId="3")
    like40 = PostLike(postId="31", userId="3")
    like42 = PostLike(postId="31", userId="2")
    like44 = PostLike(postId="27", userId="1")
    like45 = PostLike(postId="20", userId="2")
    like46 = PostLike(postId="5", userId="3")
    like48 = PostLike(postId="15", userId="4")
    like49 = PostLike(postId="3", userId="1")
    like50 = PostLike(postId="15", userId="3")


    likes = [
        like1, like2, like3, like4, like5, like6, like7, like8, like9, like10,
        like11, like12, like14, like15, like16, like17, like18, like19, like22,
        like24, like25, like27, like28, like29, like30,
        like32, like33, like34, like35, like36, like37, like39, like40,
        like42, like44, like45, like46, like48, like49, like50
    ]


    for like in likes:
        db.session.add(like)

    db.session.commit()

def undo_postLikes():
    db.session.execute('TRUNCATE "postLikes" RESTART IDENTITY CASCADE;')
    db.session.commit()
