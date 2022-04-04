from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.models import db, User, follows

follows_routes = Blueprint('follows', __name__)

# ROUTES #######################################################################
@follows_routes.route('/', methods=["PUT"])
def toggle_following():
    sessionUserId = session['_user_id']
    followedId = request.get_json()

    if int(sessionUserId) == followedId: return jsonify("users cannot follow themselves")

    sessionUser = User.query.get(sessionUserId)
    followedUser = User.query.get(followedId)

    # follow = db.session.query(follows).filter(follows.followerId == sessionUserId).filter(follows.followedId == followedUser.id)
    follow = None
    for followerId, followedId in db.session.query(follows):
      if followerId == sessionUserId and followedId == followedUser.id:
        follow = {'followerId': followerId, 'followedId': followedId}
        break


    if follow:
      # DELETE FOLLOW
      db.session.delete(follow)
      db.session.commit()
      return jsonify({ "status": "deleted", "followerId": follow.followerId, "followedId": follow.followedId })
    else:
      # ADD FOLLOW
      followedUser.followers.append(sessionUser)
      sessionUser.following.append(followedUser)
      db.session.commit()
      # # follow = db.session.query(follows).filter(follows.followerId == sessionUserId, follows.followedId == followedUser.id)
      # follow = None
      # for followerId, followedId in db.session.query(follows):
      #   if followerId == sessionUserId and followedId == followedUser.id:
      #     follow = {'followerId': followerId, 'followedId': followedId}
      #     break

      return jsonify(sessionUser.to_dict())
