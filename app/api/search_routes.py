from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.models import db, Post, User
from sqlalchemy import desc, or_

search_routes = Blueprint('search', __name__)

# ROUTES ##################################################################################
@search_routes.route('/<query>')
def search(query):
    posts = Post.query.filter(Post.caption.ilike(f"%{query}%")).all()
    users = User.query.filter(or_(User.handle.ilike(f"%{query}%"), User.firstName.ilike(f"%{query}%"), User.lastName.ilike(f"%{query}%"))).all()
    postsList = [post.to_dict_lite() for post in posts]
    usersList = [user.to_dict_lite() for user in users]
    
    print("\n\n", postsList + usersList, '\n\n')
    # print("\n\n", usersList, '\n\n')
    # return jsonify(postsList + usersList)
    return jsonify(postsList + usersList)
