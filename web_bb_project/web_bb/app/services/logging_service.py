from datetime import date
from app.models.log_users import Log_users
from app.extensions import db

class LoggingService:
    @staticmethod
    def log_visit(path):
        if path.startswith(('/static', '/css', '/js', '/images', '/api/achivm_ps', '/api/more_achivm_ps')):
            return
        
        today = date.today()
        log_entry = Log_users.query.get(today)
        
        if not log_entry:
            log_entry = Log_users(log_date=today)
            db.session.add(log_entry)
        
        log_entry.all_count = (log_entry.all_count or 0) + 1
        
        if path == '/' or path == '/main':
            log_entry.route_main_count = (log_entry.route_main_count or 0) + 1
        elif path == '/contacts':
            log_entry.route_contacts_count = (log_entry.route_contacts_count or 0) + 1
        elif path == '/achivments':
            log_entry.route_achivments_count = (log_entry.route_achivments_count or 0) + 1
        else:
            log_entry.route_error_count = (log_entry.route_error_count or 0) + 1
        
        db.session.commit()