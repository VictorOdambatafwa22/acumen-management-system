
from model import db, PayRent
from app import app



with app.app_context():

    PayRent.query.delete()
    db.session.commit() 
  

  

  