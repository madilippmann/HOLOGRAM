from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.forms import CreatePostForm, EditPostForm
from app.models import db, Post, User
from app.api.utils import validation_errors_to_error_messages
from sqlalchemy import desc

posts_routes = Blueprint('posts', __name__)

# ROUTES ##################################################################################
@posts_routes.route('/')
def get_feed_posts():
    # FIX FIX FIX only get posts of users that session user follows
    posts = Post.query.order_by(desc(Post.createdAt)).all()

    posts = [post.to_dict() for post in posts]

    return jsonify(posts)


@posts_routes.route('/<int:postId>/')
def get_post(postId):
  post = Post.query.get(postId).to_dict()
  return jsonify(post)


@posts_routes.route('/', methods=["POST"])
def create_post():
    form = CreatePostForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    print('\n\n\n\n\n', form.data, '\n\n\n')

    if form.validate_on_submit():
        data = {
            "userId": session['_user_id'],
            "postImageUrl": form.data["postImageUrl"],
            "caption": form.data["caption"],
        }
        print('\n\n\n\n\n', data, '\n\n\n')

        post = Post(**data)
        db.session.add(post)
        db.session.commit()
        return jsonify(post.to_dict())
    print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@posts_routes.route('/<int:postId>/', methods=["PUT"])
def edit_post(postId):
    post = request.get_json()
    form = EditPostForm()

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
