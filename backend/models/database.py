import os
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    phone = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='USER', nullable=False) # 'USER' or 'ADMIN'
    preferred_language = db.Column(db.String(10), default='en', nullable=False)
    farm_name = db.Column(db.String(120), nullable=True)
    village = db.Column(db.String(120), nullable=True)
    district = db.Column(db.String(120), nullable=True)
    state = db.Column(db.String(120), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)

    # Relationships
    leaf_predictions = db.relationship('LeafPrediction', backref='user', lazy=True, cascade='all, delete-orphan')
    climate_checks = db.relationship('ClimateCheck', backref='user', lazy=True, cascade='all, delete-orphan')
    silkworm_diagnoses = db.relationship('SilkwormDiagnosis', backref='user', lazy=True, cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone or '',
            'role': self.role,
            'preferred_language': self.preferred_language or 'en',
            'farm_name': self.farm_name or '',
            'village': self.village or '',
            'district': self.district or '',
            'state': self.state or '',
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }


class LeafPrediction(db.Model):
    __tablename__ = 'leaf_predictions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    image_filename = db.Column(db.String(255), nullable=True)
    disease = db.Column(db.String(100), nullable=False)
    confidence = db.Column(db.Float, nullable=False)
    prob_disease_free = db.Column(db.Float, default=0.0)
    prob_leaf_rust = db.Column(db.Float, default=0.0)
    prob_leaf_spot = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_filename': self.image_filename,
            'disease': self.disease,
            'confidence': round(self.confidence, 2),
            'probabilities': {
                'Disease Free leaves': round(self.prob_disease_free, 2),
                'Leaf Rust': round(self.prob_leaf_rust, 2),
                'Leaf Spot': round(self.prob_leaf_spot, 2)
            },
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class ClimateCheck(db.Model):
    __tablename__ = 'climate_checks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    stage = db.Column(db.String(50), nullable=False)
    temperature = db.Column(db.Float, nullable=False)
    humidity = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), nullable=False) # 'SAFE', 'WARNING', 'CRITICAL'
    temp_correction = db.Column(db.String(255), nullable=True)
    humidity_correction = db.Column(db.String(255), nullable=True)
    impact_summary = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'stage': self.stage,
            'temperature': self.temperature,
            'humidity': self.humidity,
            'status': self.status,
            'temp_correction': self.temp_correction or '',
            'humidity_correction': self.humidity_correction or '',
            'impact_summary': self.impact_summary or '',
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class SilkwormDiagnosis(db.Model):
    __tablename__ = 'silkworm_diagnoses'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    selected_symptoms = db.Column(db.Text, nullable=False) # JSON array as string
    predicted_disease = db.Column(db.String(100), nullable=False)
    match_percentage = db.Column(db.Float, nullable=False)
    disease_type = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        import json
        try:
            symptoms_list = json.loads(self.selected_symptoms)
        except Exception:
            symptoms_list = []

        return {
            'id': self.id,
            'user_id': self.user_id,
            'selected_symptoms': symptoms_list,
            'predicted_disease': self.predicted_disease,
            'match_percentage': round(self.match_percentage, 1),
            'disease_type': self.disease_type or '',
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
