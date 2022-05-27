from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def handle_exists(form, field):
    # Checking if user handle is already in use
    handle = field.data
    user = User.query.filter(User.handle == handle).first()
    if user:
        raise ValidationError('User handle is already in use.')


class SignUpForm(FlaskForm):
    firstName = StringField('firstName', validators=[DataRequired(message='First name is required')])
    lastName = StringField('lastName', validators=[DataRequired(message='Last name is required')])
    handle = StringField(
        'handle', validators=[DataRequired(message="Handle is required"), handle_exists])
    email = StringField('email', validators=[DataRequired(message="Email is required"), user_exists])
    password = StringField('password', validators=[DataRequired(message="Password is required")])
