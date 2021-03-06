from .db import db
from sqlalchemy.sql import func

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    postImageUrl = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(255))
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post', cascade="all, delete")
    postLikes = db.relationship('PostLike', back_populates='post', cascade="all, delete")
    # hashtags = db.relationship('Hashtag', back_populates='post')


    def to_dict_lite(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'postImageUrl': self.postImageUrl,
            'caption': self.caption,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'user': self.user.to_dict_lite()
        }

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'postImageUrl': self.postImageUrl,
            'caption': self.caption,
            'postLikes': [postLike.to_dict_lite() for postLike in self.postLikes],
            'comments': [comment.to_dict_lite() for comment in self.comments],
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'user': self.user.to_dict_lite()
        }
