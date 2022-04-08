from .db import db, users_threads
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
# from .threadParticipants import users_threads
from .follows import follows
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    handle = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    bio = db.Column(db.String(255), nullable=True)
    profileImageUrl= db.Column(db.String(255), nullable=False, default='/default-profile-image.png')
    hashedPassword = db.Column(db.String(255), nullable=False)
    privateStatus = db.Column(db.Boolean, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

    posts = db.relationship('Post', back_populates='user', cascade="all, delete")
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete")
    postLikes = db.relationship('PostLike', back_populates='user', cascade="all, delete")

    messages = db.relationship('Message', back_populates='user')
    threads = db.relationship('Thread', secondary=users_threads, back_populates="user")

    followers = db.relationship(
    # this relationship allows you to access both the collection of users
    # that follow a given user (with user.followers), and the collection
    # of users that a user follows (with user.following)
        "User",
        secondary=follows,
        primaryjoin=(follows.c.followedId == id),
        secondaryjoin=(follows.c.followerId == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

    # threads = db.relationship(
    #     "Thread",
    #     secondary=users_threads,
    #     back_populates="users"
    # )

    @property
    def password(self):
        return self.hashedPassword

    @password.setter
    def password(self, password):
        self.hashedPassword = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)



    def to_dict(self):
        followers = [follower.follower_following_to_dict() for follower in self.followers]
        following = [following.follower_following_to_dict() for following in self.following]

        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'handle': self.handle,
            'bio': self.bio,
            'profileImageUrl': self.profileImageUrl,
            'privateStatus': self.privateStatus,
            'followers': followers,
            'following': following
        }

    def to_dict_lite(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'handle': self.handle,
            'bio': self.bio,
            'profileImageUrl': self.profileImageUrl,
            'privateStatus': self.privateStatus,
        }


    def session_to_dict(self):
        followers = [follower.follower_following_to_dict() for follower in self.followers]
        following = [following.follower_following_to_dict() for following in self.following]

        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'handle': self.handle,
            'email': self.email,
            'bio': self.bio,
            'profileImageUrl': self.profileImageUrl,
            'privateStatus': self.privateStatus,
            'followers': followers,
            'following': following
        }

    def follower_following_to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'handle': self.handle,
            'bio': self.bio,
            'profileImageUrl': self.profileImageUrl,
            'privateStatus': self.privateStatus,
        }
