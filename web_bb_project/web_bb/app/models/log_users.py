from app.extensions import db

class Log_users(db.Model):
    log_date = db.Column(db.Date, primary_key=True)
    all_count = db.Column(db.Integer)
    route_main_count = db.Column(db.Integer)
    route_contacts_count = db.Column(db.Integer)
    route_achivments_count = db.Column(db.Integer)
    route_error_count = db.Column(db.Integer)

    def __repr__(self):
        return f'<date {self.log_date}>'