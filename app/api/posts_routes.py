from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.forms import CreatePostForm, EditPostForm
from app.models import db, Post
from app.api.utils import validation_errors_to_error_messages


posts_routes = Blueprint('posts', __name__)


@posts_routes.route('/')
def get_feed_posts():
    # FIX FIX FIX only get posts of users that session user follows
    posts = Post.query.all()
    posts = [post.to_dict() for post in posts]
    return jsonify(posts)

@posts_routes.route('/<int:postId>/')
def get_post(postId):
  post = Post.query.get(postId).to_dict()
  # ??? do posts need to be converted to json ???
  return jsonify(post)

@posts_routes.route('/', methods=["POST"])
def create_post():
    form = CreatePostForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = {
            "userId": session['_user_id'],
            "postImageUrl": form.data["postImageUrl"],
            "caption": form.data["caption"],
        }

        post = Post(**data)
        db.session.add(post)
        db.session.commit()
        return jsonify(post.to_dict())

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@posts_routes.route('/<int:postId>/', methods=["PUT"])
def edit_post(postId):
    post = request.get_json()
    form = EditPostForm()

    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        userId = session['_user_id']

        post = Post.query.get(postId)
        post.caption = form['caption'].data
        db.session.commit()
        return jsonify(post.to_dict())

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@posts_routes.route('/<int:postId>/', methods=["DELETE"])
def delete_post(postId):
  post = Post.query.get(postId)
  userId = session['_user_id']

  if post.to_dict()['userId'] == int(userId):
    db.session.delete(post)
    db.session.commit()
    return jsonify(postId)
  else:
    return jsonify('invalid'), 401
