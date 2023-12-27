
from model import db, Apartment
from app import app



with app.app_context():

    Apartment.query.delete()
    db.session.commit() 
  

  

  