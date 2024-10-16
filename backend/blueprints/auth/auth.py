from flask import Blueprint, request, jsonify
from .auth_utils import validate_registration_input, validate_login_input, handle_errors
from models.user import User
from flask_jwt_extended import create_access_token
from app import db

auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/register', methods=['POST'])
@handle_errors
def register():
    data = request.get_json()
    valid, error_message = validate_registration_input(data)
    if not valid:
        return jsonify({"success": False, "message": error_message})
    
    if User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first():
        return jsonify({"success": False, "message": "Username or email already exists"}) 
    try:
     new_user = User(firstname=data['firstname'], lastname=data['lastname'], username=data['username'], email=data['email'])
     new_user.set_password(data['password'])

     db.session.add(new_user)
     db.session.commit()

     return jsonify({"success": True, "message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500 
    
@auth_bp.route('/login', methods=['POST'])
@handle_errors
def login():
   data = request.get_json()
   valid, error_message = validate_login_input(data)
   if not valid:
      return jsonify({"success": False, "message": error_message})
   
   user = User.query.filter_by(username=data['username']).first()
   userdata = {"id": user.id, "firstname": user.firstname, "lastname": user.lastname, "email": user.email}
   if user and user.check_password(data['password']):
    access_token = create_access_token(identity=user.id)
    return jsonify({"success": True, "access_token": access_token, "userdata": userdata, "message": "Login successfully"}), 200
   else:
    return jsonify({"success": False, "message": "Invalid username or password"}), 500

