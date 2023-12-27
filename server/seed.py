
from model import db, PaymentDay
from app import app



with app.app_context():

    PaymentDay.query.delete()
    db.session.commit() 
  

  

  