import os
from flask import Flask
from flask_cors import CORS
from extensions.extension import db, bcrypt, jwt
from blueprints.auth.auth import auth_bp
from dotenv import load_dotenv
from blueprints.file.file import file_bp

app = Flask(__name__)
CORS(app)
load_dotenv()

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URL')
app.config["JWT_SECRET_KEY"] = os.getenv('SECRET_KEY')
app.config["AWS_ACCESS_KEY_ID"] = os.getenv('AWS_ACCESS_KEY_ID')
app.config["AWS_SECRET_ACCESS_KEY"] = os.getenv('AWS_SECRET_ACCESS_KEY')

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(file_bp, url_prefix='/file')

with app.app_context():
    db.create_all()