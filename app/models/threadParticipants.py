from .db import db

users_threads = db.Table(
    "users_threads",
    db.Column("threadId", db.Integer, db.ForeignKey("threads.id")),
    db.Column("userId", db.Integer, db.ForeignKey("users.id"))
)
