from app.extensions import db

class Projects(db.Model):
    name = db.Column(db.String(255), primary_key=True)
    description = db.Column(db.String(255))
    date = db.Column(db.DateTime)
    image = db.Column(db.String(255))
    
    def __repr__(self):
        return f'<Name {self.name}>'