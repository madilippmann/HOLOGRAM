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
        return jsonify({ "status": "deleted", "postId": postId, "likeId": like.id })
    else:
        data = {
            "postId": postId,
            "userId": userId
        }

        like = PostLike(**data)
        db.session.add(like)
        db.session.commit()
        return jsonify(like.to_dict())


@postLikes_routes.route('/<int:postId>/likes/', methods=['GET'])
def get_postLikes(postId):
    likes = PostLike.query.filter(PostLike.postId == postId).all()
    likes = [like.to_dict() for like in likes]
    return jsonify(likes)
    
