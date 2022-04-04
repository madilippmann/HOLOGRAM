import os
import boto3
# import requests
import random
import string
from flask import Blueprint, jsonify, session
from flask_login import login_required
from app.models import User, Post
from botocore.config import Config

s3_routes = Blueprint('s3_routes', __name__)

def get_presigned_url():

    OBJECT_NAME_TO_UPLOAD = ''.join(random.choices(string.ascii_lowercase + string.digits, k=30))


    # my_config = Config(
    #     signature_version = 'v4',
    #     retries = {
    #         'max_attempts': 10,
    #         'mode': 'standard'
    #     }
    # )

    # client = boto3.client('kinesis', config=my_config)

    s3_client = boto3.client(
        's3',
        config=Config(
            signature_version='v4',
            region_name = 'us-east-1'
        ),
        region_name=os.environ.get('AWS_DEFAULT_REGION'),
        aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
    )

    response = s3_client.generate_presigned_url(
        'get_object',
        Params={
            'Bucket': os.environ.get('AWS_BUCKET_NAME'),
            'Key': OBJECT_NAME_TO_UPLOAD
        },
        ExpiresIn=60,
        HttpMethod='PUT'
    )

    return jsonify(response)

    # response = s3_client.generate_presigned_post(
    #     os.environ.get('AWS_BUCKET_NAME'),
    #     OBJECT_NAME_TO_UPLOAD,
    #     Fields=None,
    #     Conditions=None,
    #     ExpiresIn=60
    # )

    # return {"url": response["url"], "fields": json.dumps(response["fields"])}


@s3_routes.route('/', methods=["GET"])
def s3_presigned_url():
    return jsonify(get_presigned_url())
