from re import A
from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.models import db, User, follows
from sqlalchemy import delete

follows_routes = Blueprint('follows', __name__)

# ROUTES #######################################################################
@follows_routes.route('/', methods=["PUT"])
def toggle_following():
    sessionUserId = int(session['_user_id'])
    followedId = request.get_json()

    if int(sessionUserId) == followedId: return jsonify("users cannot follow themselves")

    sessionUser = User.query.get(sessionUserId)
    followedUser = User.query.get(followedId)

    follow = None
    rename_later = db.session.query(follows)
    for followerId, followedId in rename_later:
      if int(followerId) == int(sessionUserId) and int(followedId) == int(followedUser.id):
        follow = {'followerId': followerId, 'followedId': followedId}
        break


    if follow:
      # DELETE FOLLOW
      followedUser.followers.remove(sessionUser)
      sessionUser.following.remove(followedUser)

      db.session.commit()
      return jsonify({ "status": "deleted", "followerId": follow.get('followerId'), "followedId": follow.get('followedId') })
    else:
      # ADD FOLLOW
      followedUser.followers.append(sessionUser)
      sessionUser.following.append(followedUser)
      db.session.commit()
      return jsonify(sessionUser.to_dict())
