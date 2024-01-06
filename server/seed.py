
from model import db, User
from app import app



with app.app_context():

    User.query.delete()
    db.session.commit() 
  

  

  