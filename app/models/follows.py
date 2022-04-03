# from .db import db
# from sqlalchemy.sql import func

# class Follow(db.Model):
#     __tablename__ = 'follows'

#     id = db.Column(db.Integer, primary_key=True)
#     followerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     followedId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
#     updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

#     user_follower = db.relationship('User', back_populates='followers')
#     user_followed = db.relationship('User', back_populates='follows')

#     # TODO: to_dict() method - what associations do we need to include?



from .db import db

follows = db.Table(
    "follows", 
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)
