"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import json

api = Blueprint('api', __name__)


@api.route('/login', methods=['POST'])
def token_creation():

    data = request.data
    data_decode = json.loads(data)
    user = User.query.filter_by(**data_decode).first()
    if user is None:  
        response_body = {
            "message": "Invalid data"
        }
        return jsonify(response_body), 400
    else :
        access_token = create_access_token(identity=user.id)
        response_body = {
            "message": "Successful logging in",
            "token":access_token
        }
        return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_signup():

    data = request.data
    data_decode = json.loads(data)
    newUser = User(**data_decode)
    user = User.query.filter_by(username=newUser.username,password=newUser.password).first()
    if user is None:
        db.session.add(newUser)
        db.session.commit()
        access_token = create_access_token(identity=newUser.id)
        response_body = {
            "message": "Success creating User",
            "token":access_token
        }
        return jsonify(response_body), 200
    else :
        response_body = {
            "message": "Error, User already exists"
        }
        return jsonify(response_body), 400

@api.route("/private",methods=["POST"])
@jwt_required()
def handle_private():
    private_user = get_jwt_identity()
    return jsonify(private_user), 200

@api.route('/users', methods = ["GET"])
def getproduct():
    user = User.query.all()
    all_users = list(map(lambda x: x.serialize(), user))
    return jsonify(all_users), 200