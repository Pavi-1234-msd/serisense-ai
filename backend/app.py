import os
from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from models.database import db
from firebase.firebase_admin import init_firebase_admin
from services.leaf_service import LeafClassifierService
from services.climate_service import ClimateEngineService
from services.silkworm_service import SilkwormService

# Import blueprints
from routes.auth import auth_bp
from routes.leaf import leaf_bp
from routes.climate import climate_bp
from routes.silkworm import silkworm_bp
from routes.dashboard import dashboard_bp
from routes.admin import admin_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize Firebase Admin SDK
    try:
        init_firebase_admin()
    except Exception as e:
        print(f"[WARN] App startup: Firebase Admin SDK initialization check: {e}")

    # Configure environment-driven allowed origins for CORS
    raw_origins = os.environ.get('ALLOWED_ORIGINS', '').strip()
    if raw_origins:
        # Parse comma-separated list, trim whitespace, ignore empty strings
        allowed_origins = [orig.strip() for orig in raw_origins.split(',') if orig.strip()]
        CORS(app, origins=allowed_origins)
        print(f"[OK] CORS enabled for configured origins: {allowed_origins}")
    else:
        # Development fallback: allow all origins when ALLOWED_ORIGINS is not set
        allowed_origins = ['*']
        CORS(app, origins=['*'])

    @app.after_request
    def after_request(response):
        # Extract request origin
        req_origin = request.headers.get('Origin')
        if '*' in allowed_origins:
            response.headers['Access-Control-Allow-Origin'] = '*'
        elif req_origin and req_origin in allowed_origins:
            response.headers['Access-Control-Allow-Origin'] = req_origin
            response.headers['Vary'] = 'Origin'

        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, ngrok-skip-browser-warning'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        return response

    # Initialize extensions
    db.init_app(app)
    jwt = JWTManager(app)

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            'success': False,
            'message': 'Session expired. Please log in again.'
        }), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            'success': False,
            'message': 'Authentication token is missing'
        }), 401

    # Instantiate Core Intelligence Services
    base_dir = os.path.abspath(os.path.dirname(__file__))
    app.config['LEAF_SERVICE'] = LeafClassifierService(base_dir)
    app.config['CLIMATE_SERVICE'] = ClimateEngineService(base_dir)
    app.config['SILKWORM_SERVICE'] = SilkwormService(base_dir)

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(leaf_bp, url_prefix='/api/leaf')
    app.register_blueprint(climate_bp, url_prefix='/api/climate')
    app.register_blueprint(silkworm_bp, url_prefix='/api/silkworm')
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    # Serve uploaded images
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    @app.route('/uploads/<path:filename>')
    def serve_upload(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

    # Healthcheck / API index
    @app.route('/api/health', methods=['GET'])
    def health():
        return jsonify({
            'status': 'healthy',
            'app': 'SeriSense AI Backend',
            'version': '1.0.0',
            'database': 'Connected'
        })

    # Create tables automatically on startup
    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)