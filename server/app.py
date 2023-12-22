from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from model import db, User, Owner, Location,Apartment,UnitType,Unit,Tenant,AuditTrail
from flask_cors import CORS, cross_origin


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)
CORS(app)


@app.route('/')
def home():
    return make_response(
        jsonify({"msg":"rental houses"}), 200)


# @app.route("/users", methods=["GET","POST"])
# def Users():
#     if request.method =="GET":
#         users = [{
#             "id":user.id,
#             "name":user.name,
#             "email":user.email,
#             "contact":user.contact,
#         } for user in User.query.all()]
#         return make_response(jsonify({"Users": users}), 200)

#     elif request.method =="POST":        
#             data = request.get_json()
#             hp = User(
#                 name=data["name"],
#                 email=data["email"],
#                 contact=data["contact"],
#                 password=data["password"]   
#             )
#             db.session.add(hp)
#             db.session.commit()    

#             return make_response(jsonify(response), 200 )
#     else: 
#             return make_response(jsonify({"error": "invalid details"}), 404 )    
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/owners", methods=["GET","POST"])
def Owners():
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

            return make_response(jsonify(response), 200 )
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )   
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/owner/<int:id>", methods=["PATCH"])
def update_owner(id):
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
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/locations", methods=["GET","POST"])
def Locations():
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

            return make_response(jsonify(response), 200 )
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )   
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/location/<int:id>", methods=["PATCH"])
def update_location(id):
    location = Location.query.get(id)

    if location:
        data = request.get_json()
        if 'locationName' in data:
            location.locationName = data['locationName']
        # if 'category' in data:
        #     user_investor.category = data['category']        
        db.session.commit()  
        return make_response(jsonify({"message": "Location updated successfully"}), 200)
    else:
        return make_response(jsonify({"error": "Location not found"}), 404 )
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/unittypes", methods=["GET","POST"])
def UnitTypes():
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

            return make_response(jsonify(response), 200 )
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )   
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/unittype/<int:id>", methods=["PATCH"])
def update_unittype(id):
    unittype = UnitType.query.get(id)

    if unittype:
        data = request.get_json()
        if 'unitTypeName' in data:
            unittype.unitTypeName = data['unitTypeName']
        # if 'category' in data:
        #     user_investor.category = data['category']        
        db.session.commit()  
        return make_response(jsonify({"message": "UnitType updated successfully"}), 200)
    else:
        return make_response(jsonify({"error": "UnitType not found"}), 404 )
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/apartments", methods=["GET","POST"])
def Apartments():
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

            return make_response(jsonify(response), 200 )
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )   
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/apartment/<int:id>", methods=["PATCH"])
def update_apartment(id):
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
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/units", methods=["GET","POST"])
def Units():
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

            return make_response(jsonify(response), 200 )
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )   
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/unit/<int:id>", methods=["PATCH"])
def update_unit(id):
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
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/tenants", methods=["GET","POST"])
def Tenants():
    if request.method =="GET":
        tenants = [{
            "id":tenant.id,
            "firstName":tenant.firstName,
            "lastName":tenant.lastName,
            "email":tenant.email,
            "phoneNumber":tenant.phoneNumber,
            "unit_id":tenant.unit_id,

        } for tenant in Tenant.query.all()]
        return make_response(jsonify({"Tenants": tenants}), 200)

    elif request.method =="POST":        
            data = request.get_json()
            hp = Tenant(
                firstName=data["firstName"],
                lastName=data["lastName"], 
                email=data["email"],
                phoneNumber=data["phoneNumber"],
                unit_id=data["unit_id"]
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

            return make_response(jsonify(response), 200 )
    else: 
            return make_response(jsonify({"error": "invalid details"}), 404 )   
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
# 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
@app.route("/tenant/<int:id>",methods=["GET", "DELETE","PATCH"])
def update_tenant(id):
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