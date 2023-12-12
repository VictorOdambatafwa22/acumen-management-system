from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

db = SQLAlchemy()


class Owner(db.Model):
    __tablename__ = 'owners'

    id = db.Column(db.Integer(), primary_key=True)
    firstName= db.Column(db.String)
    lastName= db.Column(db.String)
    email= db.Column(db.String)
    phoneNumber= db.Column(db.Integer)

    def __repr__(self):

        return f'Owner(id={self.id}'
         

class User(db.Model):
    __tablename__ = 'users'


    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String)
    email= db.Column(db.String)
    contact= db.Column(db.Integer)
    password= db.Column(db.String)


    def __repr__(self):
        return f'User {self.name}'


class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer(), primary_key=True)
    locationName= db.Column(db.String)


    def __repr__(self):

        return f'Location(id={self.id}'


class Apartment(db.Model):
    __tablename__ = 'apartments'

    id = db.Column(db.Integer(), primary_key=True)
    apartmentName= db.Column(db.String)
    location_id = db.Column(db.Integer(), db.ForeignKey('locations.id'))
    owner_id = db.Column(db.Integer(), db.ForeignKey('owners.id'))


    def __repr__(self):

        return f'Apartment(id={self.id}'


class UnitType(db.Model):
    __tablename__ = 'unittypes'

    id = db.Column(db.Integer(), primary_key=True)
    unitTypeName= db.Column(db.String)


    def __repr__(self):

        return f'UnitType(id={self.id}'


class Unit(db.Model):
    __tablename__ = 'units'

    id = db.Column(db.Integer(), primary_key=True)
    unitName= db.Column(db.String)
    apartment_id = db.Column(db.Integer(), db.ForeignKey('apartments.id'))
    unitType_id = db.Column(db.Integer(), db.ForeignKey('unittypes.id'))
    unitStatus= db.Column(db.String)


    def __repr__(self):

        return f'Unit(id={self.id}'



class Tenant(db.Model):
    __tablename__ = 'tenants'

    id = db.Column(db.Integer(), primary_key=True)
    firstName= db.Column(db.String)
    lastName= db.Column(db.String)
    email= db.Column(db.String)
    phoneNumber= db.Column(db.Integer)

    def __repr__(self):

        return f'Tenant(id={self.id}'




class AuditTrail(db.Model):
    __tablename__ = 'audittrails'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    timein= db.Column(db.DateTime, server_default=db.func.now())
    timeout = db.Column(db.DateTime, onupdate=db.func.now())
  

    users = db.relationship('User', backref='audittrails')

    def __repr__(self):
        return f'AuditTrail {self.id}'        