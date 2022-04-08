from .db import db
from .users_threads import users_threads
from sqlalchemy.sql import func


class Thread(db.Model):
    __tablename__ = 'threads'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

    messages = db.relationship('Message', back_populates='thread')
    threadParticipants = db.relationship('User', secondary=users_threads, back_populates='threads')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'messages': self.messages.to_dict(),
            'threadParticipants': [participant.to_dict() for participant in self.threadParticipants],
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

    def to_dict_lite(self):
        return {
            'id': self.id,
            'name': self.name,
            'messages': self.messages.to_dict_lite(),
            'threadParticipants': [participant.to_dict() for participant in self.threadParticipants],
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
