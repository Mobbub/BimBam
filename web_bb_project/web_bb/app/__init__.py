from flask import Flask
from .config import Config
from .extensions import db
from .routes import api_routes
import time
import logging
from sqlalchemy.exc import OperationalError

# Настройка логгирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def connect_with_retry(db, max_retries=5, retry_interval=10):
    retry_count = 0
    while retry_count < max_retries:
        try:
            # Проверяем подключение
            db.engine.connect()
            logger.info("Успешное подключение к базе данных!")
            return True
        except OperationalError as e:
            retry_count += 1
            logger.warning(f"Ошибка подключения (попытка {retry_count}/{max_retries}): {str(e)}")
            if retry_count < max_retries:
                time.sleep(retry_interval)
    logger.error(f"Не удалось подключиться после {max_retries} попыток.")
    return False

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    
    # Пытаемся подключиться к БД с ретраями
    with app.app_context():
        if not connect_with_retry(db):
            raise RuntimeError("Не удалось установить соединение с базой данных")
        
        # Создаем таблицы только после успешного подключения
        db.create_all()
    
    app.register_blueprint(api_routes.bp)
    
    return app