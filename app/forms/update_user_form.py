from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class UpdateUserForm(FlaskForm):
    firstName = StringField('firstName', validators=[DataRequired()])
    lastName = StringField('lastName', validators=[DataRequired()])
    bio = StringField('bio', validators=[DataRequired()])
    # profileImageUrl = StringField('profileImageUrl', validators=[DataRequired()])
