from .db import db
from sqlalchemy.sql import func


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    threadId = db.Column(db.Integer, db.ForeignKey('threads.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text(2000), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

    thread = db.relationship('Thread', back_populates='messages')
    user = db.relationship('User', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'threadId': self.threadId,
            'userId': self.userId,
            'content': self.content,
            'user': self.user.to_dict(),
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

    def to_dict_lite(self):
        return {
            'id': self.id,
            'threadId': self.threadId,
            'userId': self.userId,
            'content': self.content,
            'user': self.user.to_dict_lite(),
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
