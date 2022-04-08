from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.models import db, Post, User
from sqlalchemy import desc, or_

search_routes = Blueprint('posts', __name__)

# ROUTES ##################################################################################
@search_routes.route('/<query>')
def search(query):
    return 'bruh';
