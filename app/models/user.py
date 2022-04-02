from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
# from .threadParticipants import users_threads

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    handle = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    bio = db.Column(db.String(255), nullable=True)
    profileImageURL= db.Column(db.String(255), nullable=True)
    hashedPassword = db.Column(db.String(255), nullable=False)
    privateStatus = db.Column(db.Boolean, nullable=False)

    # posts = db.relationship('Post', back_populates='user')
    # comments = db.relationship('Comment', back_populates='user')
    # postLikes = db.relationship('PostLike', back_populates='user')

    # threads = db.relationship(
    #     "Thread",
    #     secondary=users_threads,
    #     back_populates="users"
    # )

    # followers =db.relationship('Follow', back_populates='user_follower')
    # follows = db.relationship('Follow', back_populates='user_followed')

    @property
    def password(self):
        return self.hashedPassword

    @password.setter
    def password(self, password):
        self.hashedPassword = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'handle': self.handle,
            'email': self.email,
            'bio': self.bio,
            'profileImageURL': self.profileImageURL,
            'privateStatus': self.privateStatus
        }
