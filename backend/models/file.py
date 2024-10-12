from app import db
from datetime import datetime, timezone

class File(db.Model):
    __tablename__='File'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    filename = db.Column(db.String, nullable=False)
    s3_key = db.Column(db.String, unique=True, nullable=False)
    s3_url = db.Column(db.String, unique=True, nullable=False)
    ai_description = db.Column(db.String, nullable=True)
    uploadTime = db.Column(db.DateTime, default = lambda: datetime.now(timezone.utc), nullable=False) 