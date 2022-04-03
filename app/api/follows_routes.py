from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.models import db, User, follows

follows_routes = Blueprint('follows', __name__)

# ROUTES #######################################################################
@follows_routes.route('/', methods=["PUT"])
def toggle_following():
    sessionUserId = session['_user_id']
    data = request.get_json()
    
    if sessionUserId == data["followedId"]: return jsonify("users cannot follow themselves")
    
    sessionUser = User.query.get(sessionUserId)
    followedUser = User.query.get(data["followedId"])
    
    follow = db.session.query(follows).filter(follows.followerId == sessionUserId, follows.followedId == followedUser.id)

    if follow:
      db.session.delete(follow)
      db.session.commit()
      return jsonify({ "status": "deleted", "followerId": follow.followerId, "followedId": follow.followedId })
    else:
      followedUser.followers.append(sessionUser)
      db.session.commit()
      follow = db.session.query(follows).filter(follows.followerId == sessionUserId, follows.followedId == followedUser.id)
      return jsonify(follow.to_dict())
