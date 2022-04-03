from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post

user_routes = Blueprint('users', __name__)

# ROUTES #######################################################################
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/posts')
@login_required
def user_profile(id):
    posts = Post.query.filter(Post.userId == id).all()
    posts = [post.to_dict() for post in posts]
    return jsonify(posts)


@user_routes.route('/<int:userId>/follows/', methods=['GET'])
def get_follows(userId):
    """
    GET /api/users/:userId/follows\n
    get all of a user's followers and the users that they are following
    """
    user = User.query.get(userId)
    follows = {
        "followers": [user.to_dict() for user in user.followers],
        "following": [user.to_dict() for user in user.following]
    }
    return jsonify(follows)
