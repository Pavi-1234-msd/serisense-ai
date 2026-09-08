from app import app
from models.database import db, User

def seed_demo_data():
    with app.app_context():
        db.create_all()
        # Check if demo farmer exists
        demo_user = User.query.filter_by(email='farmer@serisense.com').first()
        if not demo_user:
            demo_user = User(
                full_name='Pavithran Ramasamy',
                email='farmer@serisense.com',
                phone='9876543210',
                role='USER',
                preferred_language='en',
                farm_name='Sri Lakshmi Mulberry Farm',
                village='Gobichettipalayam',
                district='Erode',
                state='Tamil Nadu'
            )
            demo_user.set_password('farmer123')
            db.session.add(demo_user)
            print("[OK] Created Demo Farmer Account: farmer@serisense.com / farmer123")

        # Check if admin exists
        admin_user = User.query.filter_by(email='admin@serisense.com').first()
        if not admin_user:
            admin_user = User(
                full_name='SeriSense Admin',
                email='admin@serisense.com',
                phone='9999999999',
                role='ADMIN',
                preferred_language='en',
                farm_name='Research Station',
                district='Bengaluru',
                state='Karnataka'
            )
            admin_user.set_password('admin123')
            db.session.add(admin_user)
            print("[OK] Created Admin Account: admin@serisense.com / admin123")

        db.session.commit()
        print("[OK] Database initialization complete!")

if __name__ == '__main__':
    seed_demo_data()
