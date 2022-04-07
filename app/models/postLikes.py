from .db import db
from sqlalchemy.sql import func


class PostLike(db.Model):
    __tablename__ = 'postLikes'

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())


    post = db.relationship('Post', back_populates='postLikes')
    user = db.relationship('User', back_populates='postLikes')

    def to_dict(self):
        return {
            'id': self.id,
            'postId': self.postId,
            'userId': self.userId,
            'user': self.user.to_dict(),
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

    def to_dict_lite(self):
        return {
            'id': self.id,
            'postId': self.postId,
            'userId': self.userId,
            'user': self.user.to_dict_lite(),
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
