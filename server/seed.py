
from model import db, Unit
from app import app



with app.app_context():

    Unit.query.delete()
    db.session.commit() 
  

  

  