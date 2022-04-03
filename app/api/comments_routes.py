from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.forms import CreateCommentForm, EditCommentForm
from app.models import db, Comment
from app.api.utils import validation_errors_to_error_messages

comments_routes = Blueprint('comments', __name__)


# ROUTES #############################################################################
@comments_routes.route('/<int:postId>/comments/')
def get_comments(postId):
    comments = Comment.query.filter(Comment.postId == postId).all()
    comments = [comment.to_dict() for comment in comments]
    return jsonify(comments)

@comments_routes.route('/<int:postId>/comments/<int:commentId>/', methods=["PUT"])
def edit_comment(postId, commentId):

    print('\n\n\n\nENTERED EDIT COMMENT ROUTE\n\n\n\n')
    form = CreateCommentForm()
    comment = request.get_json()

    form['csrf_token'].data = request.cookies['csrf_token']
    userId = session['_user_id']

    if form.validate_on_submit():
        comment = Comment.query.get(commentId)
        if int(userId) == comment.userId:
            comment.content = form['content'].data
            db.session.commit()
            print(comment.to_dict())
            return jsonify(comment.to_dict())

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@comments_routes.route('/<int:postId>/comments/', methods=["POST"])
def create_comment(postId):
    form = CreateCommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = {
            "userId": session['_user_id'],
            "postId": postId,
            "content": form.data["content"],
        }

        comment = Comment(**data)
        db.session.add(comment)
        db.session.commit()
        print(comment.to_dict())
        return jsonify(comment.to_dict())

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
