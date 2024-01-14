from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity,get_jwt,JWTManager
from datetime import datetime, timedelta
from model import db, User, Owner, Location,Apartment,UnitType,Unit,Tenant,AuditTrail,PaymentDay,Utility,PayRent
from flask_cors import CORS, cross_origin

from email.message import EmailMessage
from trial2 import password
import ssl
import smtplib



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)


migrate = Migrate(app, db)

db.init_app(app)
CORS(app)


@app.route('/')
def home():
    return make_response(
        jsonify({"msg":"rental houses"}), 200)


@app.route("/users", methods=["GET", "POST"])
def Users():
    if request.method == "GET":
        users = [{
            "id": user.id,
            "username": user.username,
            "email": user.email,
        } for user in User.query.all()]
        return make_response(jsonify({"Users": users}), 200)

    elif request.method == "POST":
        data = request.get_json()
        hashed_password = generate_password_hash(data["password"], method='scrypt')
        # hashed_password = generate_password_hash(data["password"], method='sha256')
        

        new_user = User(
            username=data["username"],
            email=data["email"],
            password=hashed_password  # Store the hashed password in the database
        )

        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify({"message": "User added successfully"}), 200)
    else:
        return make_response(jsonify({"error": "invalid details"}), 404)
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/user-emails", methods=["GET", "POST"])
def UserEmails():
    if request.method == "GET":
        emails = [{"email": user.email} for user in User.query.all()]
        return make_response(jsonify({"UserEmails": emails}), 200)

    elif request.method == "POST":
        data = request.get_json()
        email = data.get("email")  # Use data["email"] if you are sure it will be present

        if email:
            # Create User instance
            user = User(email=email)

            # Check if user with the given email already exists
            existing_user = User.query.filter_by(email=email).first()

            if existing_user:

                # return make_response(jsonify({"error": "User already exists"}), 400)

            # Save the new user to the database
            # db.session.add(user)
            # db.session.commit()

            # Send email
                email_sender = 'omondivictor120@gmail.com'
                email_password = password  # Replace with your actual password
                print(request.headers.get('Host').split(':')[1])

                email_receiver = data.get("email")
                subject = "Click the link below to reset your password"
                body = f"""
                  {request.remote_addr}:3000/reset-password/{existing_user.id}
                  
                """

                em = EmailMessage()
                em['From'] = email_sender
                em['To'] = email_receiver
                em['Subject'] = subject
                em.set_content(body)

                context = ssl.create_default_context()

                with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
                    smtp.login(email_sender, email_password)
                    smtp.sendmail(email_sender, email_receiver, em.as_string())

                return make_response(jsonify({"message": "User added successfully"}), 200)
            else:
                return make_response(jsonify({"error": "Invalid details"}), 400)      
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'   
# Your existing /logins route
@app.route("/logins", methods=["POST"])
def logins():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username and password:
        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            
            # Generate JWT token using Flask-JWT-Extended
            # payload={'id':user.UserID,'username':user.Username,'email':user.Email,'profilePicture':user.ProfilePicture,'bio':user.Bio}
            token = create_access_token(identity=user.username, expires_delta=timedelta(minutes=30))
            return make_response(jsonify({"token": token}), 200)
        else:
            return make_response(jsonify({"message": "Invalid email or password"}), 401)
    else:
        return make_response(jsonify({"message": "Missing email or password"}), 400)

# Example protected route
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    username = get_jwt_identity()
    
    # Add your logic for handling the protected route here

    return make_response(jsonify({"message": f"Hello, {username}! This is a protected route."}), 200)
     
# mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm         
@app.route("/user/<int:id>",methods=["GET", "DELETE","PATCH"])
def update_user(id):
    if request.method =="GET":
        user = User.query.filter_by(id=id).first()
        if user:
         users = [{
            "id":user.id,
            "username":user.username,
            "email":user.email,

        } for user in User.query.all()]
        return make_response(jsonify({"Users": users}), 200)
   
    elif request.method =="PATCH":
       
        user = User.query.get(int(id))
        
        if user:            
            data = request.get_json()

            if 'newPassword' in data:
                new_password = data['newPassword']
                hashed_password = generate_password_hash(new_password, method='sha256')
                user.password = hashed_password 

            db.session.commit()  
            return make_response(jsonify({"message": "User updated successfully"}), 200)
        else:
            return make_response(jsonify({"error": "User not found"}), 404 )


    elif request.method =="DELETE":
        user = User.query.filter_by(id=id).first() 

        if user:
            User.query.filter_by(id=id).delete()
            db.session.delete(user)
            db.session.commit()

            return make_response("User successfully deleted", 204 )
        else:
            return make_response(jsonify({"error": "User not found"}), 404 )        
         

# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
@app.route("/owners", methods=["GET","POST"])
@jwt_required()
def Owners():
    username = get_jwt_identity()
    if request.method =="GET":
        owners = [{
            "id":owner.id,
            "firstName":owner.firstName,
            "lastName":owner.lastName,
            "email":owner.email,
            "phoneNumber":owner.phoneNumber,
        } for owner in Owner.query.all()]
        return make_response(jsonify({"Owners": owners}), 200)

    elif request.method =="POST":        
            data = request.get_json()
            hp = Owner(
                firstName=data["firstName"],
                lastName=data["lastName"], 
                email=data["email"],
                phoneNumber=data["phoneNumber"]
            )
            db.session.add(hp)
            db.session.commit()    

            return make_response(jsonify({"message": "Owner added successfully"}), 200)
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )    
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/owner/<int:id>",methods=["GET", "DELETE","PATCH"])
@jwt_required()
def update_owner(id):
    username = get_jwt_identity()
    if request.method =="GET":
        owner = Owner.query.filter_by(id=id).first()
        if owner:
         owners = [{
            "id":owner.id,
            "firstName":owner.firstName,
            "lastName":owner.lastName,
            "email":owner.email,
            "phoneNumber":owner.phoneNumber,

        } for owner in Owner.query.all()]
        return make_response(jsonify({"Owners": owners}), 200)
   
    elif request.method =="PATCH":
        owner = Owner.query.get(id)
        
        if owner:            
            data = request.get_json()

            if 'firstName' in data:
                owner.firstName = data['firstName']
            if 'lastName' in data:
                owner.lastName = data['lastName']   
            if 'email' in data:
                owner.email = data['email'] 
            if 'phoneNumber' in data:
                owner.phoneNumber = data['phoneNumber']


            db.session.commit()  
            return make_response(jsonify({"message": "Owner updated successfully"}), 200)
        else:
            return make_response(jsonify({"error": "Owner not found"}), 404 )


    elif request.method =="DELETE":
        owner = Owner.query.filter_by(id=id).first() 

        if owner:
            Owner.query.filter_by(id=id).delete()
            db.session.delete(owner)
            db.session.commit()

            return make_response("Owner successfully deleted", 204 )
        else:
            return make_response(jsonify({"error": "Owner not found"}), 404 )        
         

# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
@app.route("/locations", methods=["GET","POST"])
@jwt_required()
def Locations():
    username = get_jwt_identity()
    if request.method =="GET":
        locations = [{
            "id":location.id,
            "locationName":location.locationName,

        } for location in Location.query.all()]
        return make_response(jsonify({"Locations": locations}), 200)

    elif request.method =="POST":        
            data = request.get_json()
            hp = Location(
                locationName=data["locationName"]
            )
            db.session.add(hp)
            db.session.commit()    
            message = f"Hello, {username}! This is a protected route."
            return make_response(jsonify({"message": message}), 200)
            return make_response(jsonify({"message": "Location added successfully"}), 200)
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )   
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/location/<int:id>",methods=["GET", "DELETE","PATCH"])
@jwt_required()
def update_location(id):
    username = get_jwt_identity()
    if request.method =="GET":
        location = Location.query.filter_by(id=id).first()
        if location:
         locations = [{
            "id":location.id,
            "locationName":location.locationName,

        } for location in Location.query.all()]
        return make_response(jsonify({"Locations": locations}), 200)
   
    elif request.method =="PATCH":
        location = Location.query.get(id)
        
        if location:            
            data = request.get_json()

            if 'locationName' in data:
                location.locationName = data['locationName']

            db.session.commit()  
            return make_response(jsonify({"message": "Location updated successfully"}), 200)
        else:
            return make_response(jsonify({"error": "Location not found"}), 404 )


    elif request.method =="DELETE":
        location = Location.query.filter_by(id=id).first() 

        if location:
            Location.query.filter_by(id=id).delete()
            db.session.delete(location)
            db.session.commit()

            return make_response("Location successfully deleted", 204 )
        else:
            return make_response(jsonify({"error": "Location not found"}), 404 )        
         

# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
@app.route("/utilities", methods=["GET","POST"])
@jwt_required()
def Utilities():
    username = get_jwt_identity()
    if request.method =="GET":
        utilities = [{
            "id":utility.id,
            "utilityName":utility.utilityName,
            "costPerUnit":utility.costPerUnit,

        } for utility in Utility.query.all()]
        return make_response(jsonify({"Utilities": utilities}), 200)

    elif request.method =="POST":        
            data = request.get_json()
            hp = Utility(
                utilityName=data["utilityName"],
                costPerUnit=data["costPerUnit"]

            )
            db.session.add(hp)
            db.session.commit()    

            return make_response(jsonify({"message": "Utility added successfully"}), 200)
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )   
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/utility/<int:id>",methods=["GET", "DELETE","PATCH"])
@jwt_required()
def update_utility(id):
    username = get_jwt_identity()
    if request.method =="GET":
        utility = Utility.query.filter_by(id=id).first()
        if utility:
         utilities = [{
            "id":utility.id,
            "utilityName":utility.utilityName,
            "costPerUnit":utility.costPerUnit,

        } for utility in Utility.query.all()]
        return make_response(jsonify({"Utilities": utilities}), 200)
   
    elif request.method =="PATCH":
        utility = Utility.query.get(id)
        
        if utility:            
            data = request.get_json()

            if 'utilityName' in data:
                utility.utilityName = data['utilityName']

            if 'costPerUnit' in data:
                utility.costPerUnit = data['costPerUnit']

            db.session.commit()  
            return make_response(jsonify({"message": "Utility updated successfully"}), 200)
        else:
            return make_response(jsonify({"error": "Utility not found"}), 404 )


    elif request.method =="DELETE":
        utility = Utility.query.filter_by(id=id).first() 

        if utility:
            Utility.query.filter_by(id=id).delete()
            db.session.delete(utility)
            db.session.commit()

            return make_response("Utility successfully deleted", 204 )
        else:
            return make_response(jsonify({"error": "Utility not found"}), 404 )        
         

# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
@app.route("/paymentdays", methods=["GET","POST"])
@jwt_required()
def PaymentDays():
    username = get_jwt_identity()
    if request.method =="GET":
        paymentdays = [{
            "id":paymentday.id,
            "rentDay":paymentday.rentDay,

        } for paymentday in PaymentDay.query.all()]
        return make_response(jsonify({"PaymentDays": paymentdays}), 200)

    elif request.method =="POST":        
            data = request.get_json()
            hp = PaymentDay(
                rentDay=data["rentDay"]
            )
            db.session.add(hp)
            db.session.commit()    

            return make_response(jsonify({"message": "Payment day added successfully"}), 200)
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )   
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/paymentday/<int:id>",methods=["GET", "DELETE","PATCH"])
@jwt_required()
def update_paymentday(id):
    username = get_jwt_identity()
    if request.method =="GET":
        paymentday = PaymentDay.query.filter_by(id=id).first()
        if paymentday:
         paymentdays = [{
            "id":paymentday.id,
            "rentDay":paymentday.rentDay,

        } for paymentday in PaymentDay.query.all()]
        return make_response(jsonify({"PaymentDays": paymentdays}), 200)
   
    elif request.method =="PATCH":
        paymentday = PaymentDay.query.get(id)
        
        if paymentday:            
            data = request.get_json()

            if 'rentDay' in data:
                paymentday.rentDay = data['rentDay']

            db.session.commit()  
            return make_response(jsonify({"message": "PaymentDay updated successfully"}), 200)
        else:
            return make_response(jsonify({"error": "PaymentDay not found"}), 404 )


    elif request.method =="DELETE":
        paymentday = Location.query.filter_by(id=id).first() 

        if paymentday:
            PaymentDay.query.filter_by(id=id).delete()
            db.session.delete(paymentday)
            db.session.commit()

            return make_response("PaymentDay successfully deleted", 204 )
        else:
            return make_response(jsonify({"error": "PaymentDay not found"}), 404 )        
         

# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/unittypes", methods=["GET","POST"])
@jwt_required()
def UnitTypes():
    username = get_jwt_identity()
    if request.method =="GET":
        unittypes = [{
            "id":unittype.id,
            "unitTypeName":unittype.unitTypeName,

        } for unittype in UnitType.query.all()]
        return make_response(jsonify({"UnitTypes": unittypes}), 200)

    elif request.method =="POST":        
            data = request.get_json()
            hp = UnitType(
                unitTypeName=data["unitTypeName"]
            )
            db.session.add(hp)
            db.session.commit()    

            return make_response(jsonify({"message": "Unit type added successfully"}), 200)
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )   
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/unittype/<int:id>",methods=["GET", "DELETE","PATCH"])
@jwt_required()
def update_unittype(id):
    username = get_jwt_identity()
    if request.method =="GET":
        unittype = UnitType.query.filter_by(id=id).first()
        if unittype:
         unittypes = [{
            "id":unittype.id,
            "unitTypeName":unittype.unitTypeName,

        } for unittype in UnitType.query.all()]
        return make_response(jsonify({"UnitTypes": unittypes}), 200)
   
    elif request.method =="PATCH":
        unittype = UnitType.query.get(id)
        
        if unittype:            
            data = request.get_json()

            if 'unitTypeName' in data:
                unittype.unitTypeName = data['unitTypeName']

            db.session.commit()  
            return make_response(jsonify({"message": "UnitType updated successfully"}), 200)
        else:
            return make_response(jsonify({"error": "UnitType not found"}), 404 )


    elif request.method =="DELETE":
        unittype = UnitType.query.filter_by(id=id).first() 

        if unittype:
            UnitType.query.filter_by(id=id).delete()
            db.session.delete(unittype)
            db.session.commit()

            return make_response("UnitType successfully deleted", 204 )
        else:
            return make_response(jsonify({"error": "UnitType not found"}), 404 )        
         

# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/apartments", methods=["GET","POST"])
@jwt_required()
def Apartments():
    username = get_jwt_identity()
    if request.method =="GET":
        apartments = [{
            "id":apartment.id,
            "apartmentName":apartment.apartmentName,
            "location_id":apartment.location.locationName,
            "owner_id":apartment.owner.firstName,
        } for apartment in Apartment.query.all()]
        return make_response(jsonify({"Apartments": apartments}), 200)

    elif request.method =="POST":        
            data = request.get_json()
            hp = Apartment(
                apartmentName=data["apartmentName"],
                location_id=data["location_id"], 
                owner_id=data["owner_id"]
            )
            db.session.add(hp)
            db.session.commit()    

            return make_response(jsonify({"message": "Apartment added successfully"}), 200)
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )   
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/apartment/<int:id>",methods=["GET", "DELETE","PATCH"])
@jwt_required()
def update_apartment(id):
    username = get_jwt_identity()
    if request.method =="GET":
        apartment = Apartment.query.filter_by(id=id).first()
        if apartment:
         apartments = [{
            "id":apartment.id,
            "apartmentName":apartment.apartmentName,
            "location_id":apartment.location_id,
            "owner_id":apartment.owner_id,

        } for apartment in Apartment.query.all()]
        return make_response(jsonify({"Apartments": apartments}), 200)
   
    elif request.method =="PATCH":
        apartment = Apartment.query.get(id)
        
        if apartment:            
            data = request.get_json()

            if 'apartmentName' in data:
                apartment.apartmentName = data['apartmentName']
            if 'location_id' in data:
                apartment.location_id = data['location_id']   
            if 'owner_id' in data:
                apartment.owner_id = data['owner_id'] 

            db.session.commit()  
            return make_response(jsonify({"message": "Apartment updated successfully"}), 200)
        else:
            return make_response(jsonify({"error": "Apartment not found"}), 404 )


    elif request.method =="DELETE":
        apartment = Apartment.query.filter_by(id=id).first() 

        if apartment:
            apartment.query.filter_by(id=id).delete()
            db.session.delete(apartment)
            db.session.commit()

            return make_response("Apartment successfully deleted", 204 )
        else:
            return make_response(jsonify({"error": "Apartment not found"}), 404 )        
         

# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
@app.route("/units", methods=["GET","POST"])
@jwt_required()
def Units():
    username = get_jwt_identity()
    if request.method =="GET":
        units = [{
            "id":unit.id,
            "unitName":unit.unitName,
            "apartment_id":unit.apartment.apartmentName,
            "location_id":unit.apartment.location.locationName,
            "unitType_id":unit.unittype.unitTypeName,
            "rentAmount":unit.rentAmount,
            "unitStatus":unit.unitStatus,
        } for unit in Unit.query.all()]
        return make_response(jsonify({"Units": units}), 200)

    elif request.method =="POST":        
            data = request.get_json()
            hp = Unit(
                unitName=data["unitName"],
                apartment_id=data["apartment_id"], 
                unitType_id=data["unitType_id"],
                rentAmount=data["rentAmount"],
                unitStatus=data["unitStatus"]
            )
            db.session.add(hp)
            db.session.commit()    

            return make_response(jsonify({"message": "Unit added successfully"}), 200)
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )   
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/unit/<int:id>",methods=["GET", "DELETE","PATCH"])
@jwt_required()
def update_unit(id):
    username = get_jwt_identity()
    if request.method =="GET":
        unit = Unit.query.filter_by(id=id).first()
        if unit:
         units = [{
            "id":unit.id,
            "unitName":unit.unitName,
            "apartment_id":unit.apartment_id,
            "unitType_id":unit.unitType_id,
            "rentAmount":unit.rentAmount,

        } for unit in Unit.query.all()]
        return make_response(jsonify({"Units": units}), 200)
   
    elif request.method =="PATCH":
        unit = Unit.query.get(id)
        
        if unit:            
            data = request.get_json()

            if 'unitName' in data:
                unit.unitName = data['unitName']
            if 'apartment_id' in data:
                unit.apartment_id = data['apartment_id']   
            if 'unitType_id' in data:
                unit.unitType_id = data['unitType_id'] 
            if 'rentAmount' in data:
                unit.rentAmount = data['rentAmount']


            db.session.commit()  
            return make_response(jsonify({"message": "Unit updated successfully"}), 200)
        else:
            return make_response(jsonify({"error": "Unit not found"}), 404 )


    elif request.method =="DELETE":
        unit = Unit.query.filter_by(id=id).first() 

        if unit:
            Unit.query.filter_by(id=id).delete()
            db.session.delete(unit)
            db.session.commit()

            return make_response("Unit successfully deleted", 204 )
        else:
            return make_response(jsonify({"error": "Unit not found"}), 404 )        
         

# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/tenants", methods=["GET","POST"])
@jwt_required()
def Tenants():
    username = get_jwt_identity()
    if request.method =="GET":
        tenants = [{
            "id":tenant.id,
            "firstName":tenant.firstName,
            "lastName":tenant.lastName,
            "email":tenant.email,
            "phoneNumber":tenant.phoneNumber,
            "unit_id":tenant.unit_id,
            "arrears":tenant.arrears,

        } for tenant in Tenant.query.all()]
        return make_response(jsonify({"Tenants": tenants}), 200)

    elif request.method =="POST":        
            data = request.get_json()
            hp = Tenant(
                firstName=data["firstName"],
                lastName=data["lastName"], 
                email=data["email"],
                phoneNumber=data["phoneNumber"],
                unit_id=data["unit_id"],
                arrears=data["arrears"]
            )
            db.session.add(hp)
            db.session.commit()  
# mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm Updating unit when occupied by a tenant
            unit = Unit.query.get(int(data["unit_id"]))
            print(unit.unitStatus)
            if unit:
                unit.unitStatus = 'Occupied'
            db.session.add(unit) 
            db.session.commit()  

            return make_response(jsonify({"message": "Tenant added successfully"}), 200)
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )   
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/tenant/<int:id>",methods=["GET", "DELETE","PATCH"])
@jwt_required()
def update_tenant(id):
    username = get_jwt_identity()
    if request.method =="GET":
        tenant = Tenant.query.filter_by(id=id).first()
        if tenant:
         tenants = [{
            "id":tenant.id,
            "firstName":tenant.firstName,
            "lastName":tenant.lastName,
            "email":tenant.email,
            "phoneNumber":tenant.phoneNumber,
            "unit_id":tenant.unit_id,
            "arrears":tenant.arrears,

        } for tenant in Tenant.query.all()]
        return make_response(jsonify({"Tenants": tenants}), 200)
   
    elif request.method =="PATCH":
        tenant = Tenant.query.get(id) 
        
        if tenant:            
            data = request.get_json()

            if 'firstName' in data:
                tenant.firstName = data['firstName']
            if 'lastName' in data:
                tenant.lastName = data['lastName']   
            if 'email' in data:
                tenant.email = data['email'] 
            if 'phoneNumber' in data:
                tenant.phoneNumber = data['phoneNumber']
            if 'arrears' in data:
                tenant.arrears = data['arrears']

            db.session.commit()  
            return make_response(jsonify({"message": "Tenant updated successfully"}), 200)
        else:
            return make_response(jsonify({"error": "Tenant not found"}), 404 )


    elif request.method =="DELETE":
        tenant = Tenant.query.filter_by(id=id).first() 

        if tenant:
            unit = Unit.query.filter_by(id=tenant.unit_id).first()
            if unit:

                unit.unitStatus = 'Vacant'
                db.session.add(unit)

            Tenant.query.filter_by(id=id).delete()
            db.session.delete(tenant)
            db.session.commit()

            return make_response("Tenant successfully deleted", 204 )
        else:
            return make_response(jsonify({"error": "Tenant not found"}), 404 )        
         

# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/payrents", methods=["GET","POST","PATCH"])
@jwt_required()
def PayRents():
    username = get_jwt_identity()
    if request.method =="GET":
        payrents = [{
            "id":payrent.id,
            "tenant_id":payrent.tenant_id,
            "totalDue":payrent.totalDue,
            "amountPaid":payrent.amountPaid,
            "balance":payrent.balance,
            "mpesaCode":payrent.mpesaCode,
            "entryDate":payrent.entryDate,

        } for payrent in PayRent.query.all()]
        return make_response(jsonify({"PayRents": payrents}), 200)

    elif request.method =="POST":        
            data = request.get_json()
            hp = PayRent(
                tenant_id=data["tenant_id"],
                totalDue=data["totalDue"], 
                amountPaid=data["amountPaid"],
                balance=data["balance"],
                mpesaCode=data["mpesaCode"]
                #entryDate=data["entryDate"]
            )
            db.session.add(hp)
            db.session.commit()  
# mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm Updating arrears when rent is paid
            tenant = Tenant.query.get(int(data["tenant_id"]))
            print(tenant.arrears)
            if tenant:
                tenant.arrears = int(tenant.arrears) - int(data["amountPaid"])
            db.session.add(tenant) 
            db.session.commit()  
# mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm PATCH used to adjust monthly rents
            return make_response(jsonify({"message": "Tenant updated successfully"}), 200)
     

    elif request.method =="PATCH":

       # Get all tenants
        tenants = Tenant.query.all()

        # Iterate through each tenant
        for tenant in tenants:
            print(tenant.arrears)
            tenant.arrears = int(tenant.arrears) + int(tenant.units.rentAmount)
            db.session.add(tenant)

# Commit the changes after updating all tenants
        db.session.commit()

# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
        return make_response(jsonify({"message": "Tenant updated successfully"}), 200)
    else: 
        return make_response(jsonify({"error": "invalid details"}), 404 )   

# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/payrent/<int:id>",methods=["GET", "DELETE"])
@jwt_required()
def update_payrent(id):
    username = get_jwt_identity()
    if request.method =="GET":
        payrent = PayRent.query.filter_by(id=id).first()
        if payrent:
         payrents = [{
            "id":payrent.id,
            "tenant_id":payrent.tenant_id,
            "totalDue":payrent.totalDue,
            "amountPaid":payrent.amountPaid,
            "balance":payrent.balance,
            "mpesaCode":payrent.mpesaCode,
            "entryDate":payrent.entryDate,

        } for payrent in PayRent.query.all()]
        return make_response(jsonify({"PayRents": payrents}), 200)
   

    elif request.method =="DELETE":
        payrent = PayRent.query.filter_by(id=id).first() 

        if payrent:
            tenant = Tenant.query.filter_by(id=payrent.tenant_id).first()
            if tenant:

                # tenant.arrears = tenant.arrears+payrent.amountPaid
                tenant.arrears = int(tenant.arrears) + int(payrent.amountPaid)

                db.session.add(tenant)

            PayRent.query.filter_by(id=id).delete()
            db.session.delete(payrent)
            db.session.commit()

            return make_response(jsonify({"message": "Transaction cancelled successfully"}), 200)
        else:
            return make_response(jsonify({"error": "Tenant not found"}), 404 )        
         

# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
# @app.route("/users/<int:id>",methods=["GET"])
# def users_view(id):
#     if request.method =="GET":
#         user = User.query.filter_by(id=id).first()
#         if user:
#             investors = [{"id": investor.id, "name": investor.name, "contact": investor.contact, "email": investor.email} for investor in user.investors]
#             response = {
#                 "id":user.id,
#                 "name":user.name,
#                 "contact": user.contact,
#                 "email": user.email,
#                 "investors": investors
#             }
#             return make_response(jsonify(response), 200 )
#         else: 
#             return make_response(jsonify({"error": "user not found"}), 404 )        



# @app.route("/investors/<int:id>",methods=["GET"])
# def inves_view(id):
#     if request.method =="GET":
#         investor = Investor.query.filter_by(id=id).first()
#         if investor:
#             users = [{"id": user.id, "name": user.name, "contact": user.contact, "email": user.email} for user in investor.users]
#             response = {
#                 "id":investor.id,
#                 "name":investor.name,
#                 "contact": investor.contact,
#                 "email": investor.email,
#                 "users": users
#             }
#             return make_response(jsonify(response), 200 )
#         else: 
#             return make_response(jsonify({"error": "investor not found"}), 404 )   


# @app.route("/audittrails")
# def Audittrails():
#     audittrails = [{
#             "id":audittrail.id,
#             "timein":audittrail.timein,
#             "timeout":audittrail.timeout,
           
#         } for audittrail in AuditTrail.query.all()]
#     return make_response(jsonify({"Audittrails": audittrails}), 200)


# @app.route("/investors")
# def investor():
#     investors = [{
#             "id":invest.id,
#             "name":invest.name,
#             "company":invest.company,  
#             "contact":invest.contact,  
#         } for invest in Investor.query.all()]
#     return make_response(jsonify({"Investors": investors}), 200)

# @app.route("/users/<int:id>",methods=["GET", "DELETE"])
# def invebb_view(id):
#     if request.method =="GET":
#         investor = Investor.query.filter_by(id=id).first()
#         if investor:
#             users = [{"id": user.id, "name": user.name, "contact": user.contact, "email": user.email} for user in investor.users]
#             response = {
#                 "id":investor.id,
#                 "name":investor.name,
#                 "company":investor.company,
#                 "contact": investor.contact,
#                 "email": investor.email,
#                 "users": users
#             }
#             return make_response(jsonify(response), 200 )
#         else: 
#             return make_response(jsonify({"error": "investor not found"}), 404 )
   
#     elif request.method =="DELETE":
#         user = User.query.filter_by(id=id).first() 
#         if user:
#             UserInvestor.query.filter_by(user_id=id).delete()
#             db.session.delete(user)
#             db.session.commit()
#             return make_response("user successfully deleted", 204 )
#         else:
#             return make_response(jsonify({"error": "user not found"}), 404 )
         

# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
# @app.route("/user_investor/<int:id>", methods=["PATCH"])
# def update_user_investor(id):
#     user_investor = UserInvestor.query.get(id)

#     if user_investor:
#         data = request.get_json()
#         if 'name' in data:
#             user_investor.name = data['name']
#         if 'category' in data:
#             user_investor.category = data['category']        
#         db.session.commit()  
#         return make_response(jsonify({"message": "User investor updated successfully"}), 200)
#     else:
#         return make_response(jsonify({"error": "User investor not found"}), 404 )
# # mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm   

# @app.route("/user_investors", methods=["GET","POST"])
# def user_investors_view():
#     if request.method =="GET":
#         user_investors = [{
#             "id":userinvestor.id,
#             "name":userinvestor.name,
#             "category":userinvestor.category,
#             "user_id":userinvestor.user_id,
#             "investor_id":userinvestor.investor_id,
#             "created_at":str(userinvestor.created_at),
#             "updated_at":str(userinvestor.updated_at),
#             "description":userinvestor.description,
#         } for userinvestor in UserInvestor.query.all()]
#         return make_response(jsonify({"User_investors": user_investors}), 200)
             
#     elif request.method =="POST":
#         try:
#             data = request.get_json()
#             hp = UserInvestor(
#                 name=data["name"],
#                 category=data["category"],
#                 user_id=data["user_id"],
#                 investor_id=data["user_id"],
#                 description=data["description"]
#             )
#             db.session.add(hp)
#             db.session.commit()
#             investor = UserInvestor.query.filter_by(id=data["investor_id"]).first()
#             investor_dict = {
#                 "id": investor.id,
#                 "name": investor.name,
#                 "category": investor.category,
#                 "description": investor.description,

#             }

#             response = make_response(jsonify(investor_dict), 201)

#             return response
#         except ValueError as e:
#             response = make_response(jsonify({"errors": e.args}), 400)
#             return response
#         except Exception as e:
#             response = make_response(jsonify({"errors": e.args}), 400)
#             return response
# #mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

# #mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
            

   
if __name__ == '__main__':
    app.run(port=5556,debug=True)