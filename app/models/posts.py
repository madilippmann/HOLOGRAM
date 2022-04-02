from .db import db


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    postImageUrl = db.Column(db.Integer, nullable=False)
    caption = db.Column(db.String(255))

    # user = db.relationship('User', back_populates='posts')
    # comments = db.relationship('Comment', back_populates='post')
    # postLikes = db.relationship('PostLike', back_populates='post')
    # hashtags = db.relationship('Hashtag', back_populates='post')
