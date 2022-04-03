from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.forms import CreatePostForm, EditPostForm
from app.models import db, Comment
from app.api.utils import validation_errors_to_error_messages

comments_routes = Blueprint('comments', __name__)


# ROUTES #############################################################################
@comments_routes.route('/<int:postId>/comments/')
def get_comments(postId):
    comments = Comment.query.filter(Comment.postId == postId).all()
    comments = [comment.to_dict() for comment in comments]
    return jsonify(comments)


@comments_routes.route('//<int:postId>/comments/', methods=["POST"])
def create_comment(postId):
    # form = CreatePostForm()

    # form['csrf_token'].data = request.cookies['csrf_token']

    # if form.validate_on_submit():
    #     data = {
    #         "userId": session['_user_id'],
    #         "postImageUrl": form.data["postImageUrl"],
    #         "caption": form.data["caption"],
    #     }

    #     post = Post(**data)
    #     db.session.add(post)
    #     db.session.commit()
    #     return jsonify(post.to_dict())

    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    pass
