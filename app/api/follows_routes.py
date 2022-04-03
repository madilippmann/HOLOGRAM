from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.models import db, PostLike

follows_routes = Blueprint('follows', __name__)

# ROUTES #######################################################################
