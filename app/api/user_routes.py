from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.api.utils import validation_errors_to_error_messages
from app.forms import UpdateUserForm
from app.models import User, Post, db

user_routes = Blueprint('users', __name__)

# ROUTES #######################################################################
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<handle>/')
@login_required
def user(handle):
    user = User.query.filter(User.handle == handle).first()
    print(user.to_dict())
    if user:
        if user.id == int(session['_user_id']):
            return user.session_to_dict()
        else :
            return user.to_dict()


@user_routes.route('/<int:id>/posts/')
@login_required
def user_profile(id):
    print(session, 'aklsjhdflkasdf\n\n\n')
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
        "followers": [user.to_dict_lite() for user in user.followers],
        "following": [user.to_dict_lite() for user in user.following]
    }
    return jsonify(follows)


@user_routes.route('/<int:userId>/', methods=['PUT'])
@login_required
def update_profile(userId):

    form = UpdateUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.id == userId).first()

        user.firstName = form.data['firstName']
        user.lastName = form.data['lastName']
        user.bio = form.data['bio']
        user.profileImageUrl = form.data['profileImageUrl']

        db.session.commit()
        return user.session_to_dict()

    return { 'errors': validation_errors_to_error_messages(form.errors)}, 401
