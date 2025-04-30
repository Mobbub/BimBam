import os
from dotenv import load_dotenv
import uuid
import datetime

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', str(uuid.uuid4()))
    SESSION_COOKIE_SECURE = False  # True для HTTPS в production
    
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    PERMANENT_SESSION_LIFETIME = datetime.timedelta(days=31)
    
    DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'
    TESTING = False
    
class DevelopmentConfig(Config):
    FLASK_ENV = 'development'
    DEBUG = True
    EXPLAIN_TEMPLATE_LOADING = True

config_dict = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}