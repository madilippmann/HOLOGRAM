from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.models import db, PostLike

postLikes_routes = Blueprint('postLikes', __name__)


@postLikes_routes.route('/<int:postId>/like/', methods=['PUT'])
def toggle_postLikes(postId):
    userId = session['_user_id']

    like = PostLike.query.filter(PostLike.userId == userId, PostLike.postId == postId).first()

    if like:
        db.session.delete(like)
        db.session.commit()
        return jsonify('deleted')
    else:
        data = {
            "postId": postId,
            "userId": userId
        }

        like = PostLike(**data)
        db.session.add(like)
        db.session.commit()
        return jsonify(like.to_dict())
