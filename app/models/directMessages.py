from .db import db
from sqlalchemy.sql import func


class DirectMessage(db.Model):
    __tablename__ = 'directMessages'

    id = db.Column(db.Integer, primary_key=True)
    threadId = db.Column(db.Integer, db.ForeignKey('threads.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

    thread = db.relationship('Thread', back_populates='directMessages')
    user = db.relationship('User', back_populates='directMessages')

    def to_dict(self):
        return {
            'id': self.id,
            'threadId': self.threadId,
            'userId': self.userId,
            'user': self.user.to_dict(),
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

    def to_dict_lite(self):
        return {
            'id': self.id,
            'threadId': self.threadId,
            'userId': self.userId,
            'user': self.user.to_dict_lite(),
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
