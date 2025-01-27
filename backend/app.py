from flask import Flask, request, jsonify, redirect, url_for, session, Response
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_oauthlib.client import OAuth
from google.oauth2 import id_token
from google.auth.transport import requests
import os
import secrets
import string
import json
from bson import ObjectId

CHARSET = string.ascii_letters + string.digits + string.punctuation


app = Flask(__name__)
CORS(app)

mongo=None
bcrypt=None


try:
    app.config['MONGO_URI'] = 'mongodb+srv://mg3210sharma:5oK4cra4oqEPxCbP@cluster0.sppfjyy.mongodb.net/LMS'
    mongo = PyMongo(app)
    bcrypt = Bcrypt(app)
    @app.route('/')
    def connectionstatus():
        return 'MongoDB connection successful!'

except ConnectionError as e:
    print(f"MongoDB connection error: {e}")
    mongo = None


app.secret_key = os.urandom(24)

def google_register(name,email):
    password = ''.join(secrets.choice(CHARSET) for _ in range(10))
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    mongo.db.Users.insert_one({
        'email':email,
        'username': name,
        'password': hashed_password,
        'courses':{},
    })

    return jsonify({'message': 'Registration successful'}), 201

def admin_check(email):
    return email=="admin@edubridge.com"

def faculty_check(user):
    json_data = json.loads(json.dumps(user, cls=CustomJSONEncoder))

    if "faculty" in json_data:
        return (json_data["faculty"] is not None)
    return False

def add_faculty(coursename,faculty):
    user = mongo.db.Users.find_one({'email': faculty})
    if user:
        update_data = {"$set": {"faculty": coursename}}
        filter = {"email": faculty}
        result =  mongo.db.Users.update_one(filter, update_data)

def add_student_course(coursename,students):

    for each in students:
        user = mongo.db.Users.find_one({'email': each})
        if user:
            if user['courses']:
                temp={"courses": user['courses']+[coursename]}
            else:
                temp={"courses": [coursename]}
            update_data = {"$set": temp}
            filter = {"email": each}
            result =  mongo.db.Users.update_one(filter, update_data)

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

@app.route('/googlelogin', methods=['POST'])
def google_login():
    data = request.get_json()
    email = data['email']
    name = data['name']

    user = mongo.db.Users.find_one({'email': email})
    if user:
        return jsonify({'message': 'Login successful'}), 200

    return google_register(name,email)




@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']

    existing_user = mongo.db.Users.find_one({'email': email})

    if existing_user:
        return jsonify({'message': 'Email already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    mongo.db.Users.insert_one({
        'email':email,
        'username': name,
        'password': hashed_password,
        'faculty':None,
        'courses':[],
    })

    return jsonify({'message': 'Registration successful'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = mongo.db.Users.find_one({'email': email})
    if user and bcrypt.check_password_hash(user['password'], password):

        if admin_check(user['email']):
            return jsonify({'message': 'Welcome Admin'}), 200

        if faculty_check(user):
            return jsonify({'message': 'Welcome Instructor'}), 200

        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/users', methods=['GET'])
def users():
    user = mongo.db.Users.find()
    if user:
        data = list(user)
        json_data = json.dumps(data, cls=CustomJSONEncoder)
        return json_data,201

    return jsonify({'message': 'No Users Found'}), 401


@app.route('/get-a-user', methods=['POST'])
def getauser():
    data = request.get_json()
    user = mongo.db.Users.find({'email': data['email']})
    if user:
        data = list(user)
        json_data = json.dumps(data, cls=CustomJSONEncoder)
        return json_data,201

    return jsonify({'message': 'No Users Found'}), 401



@app.route('/courses', methods=['POST'])
def addcourses():
    data = request.get_json()
    print(data)
    name = data['name']

    faculty = data['faculty']

    subject_field=data['subject']
    difficulty_level=data['level']
    attributes = data['attributes']
    studentlist=[]
    if data['students']:
        studentlist=data['students']
    code = subject_field + " " + attributes +" "+ difficulty_level+" "+ name

    existing_course = mongo.db.Courses.find_one({'courseId': code})

    if existing_course:
        return jsonify({'message': 'Course already exists'}), 400

    facultyadded=add_faculty(code,faculty)
    add_student_course(code,studentlist)
    mongo.db.Courses.insert_one({
        'courseId':code,
        'name':name,
        'subject': subject_field,
        'level': difficulty_level,
        'attributes': attributes,
        'faculty':faculty,
        'students':studentlist,
    })

    return jsonify({'message': 'Course Registration successful'}), 201

@app.route('/remove_courses', methods=['POST'])
def removecourses():
    data = request.get_json()
    code = data['code']
    existing_course = mongo.db.Courses.find_one({'courseId': code})
    if existing_course:
        mongo.db.Courses.delete_one({'courseId': code})
        return jsonify({'message': 'Course deleted'}), 201

    return jsonify({'message': 'Course Deletion Failed'}), 401

@app.route('/get_courses', methods=['GET'])
def getcourses():

    cursor=mongo.db.Courses.find()

    if cursor:
        data = list(cursor)
        json_data = json.dumps(data, cls=CustomJSONEncoder)
        return json_data,201

    # def generate_data():
    #     for document in cursor:
    #         yield bson.BSON.encode(document)

    # return Response(generate_data(), content_type='application/bson')

    # if existing_course:
    #     print(existing_course)
    #     return jsonify(existing_course), 201

    return jsonify({'message': 'No Course with this ID'}), 401


# @app.route('/add-to-course', methods=['POST'])
# def addtocourse():
#     data = request.get_json()
#     user = mongo.db.Users.find({'email': data['email']})
#     if user:
#         data = list(user)
#         json_data = json.dumps(data, cls=CustomJSONEncoder)
#         return json_data,201

#     return jsonify({'message': 'No Users Found'}), 401

@app.route('/get-a-course', methods=['POST'])
def getacourse():
    data = request.get_json()
    course = mongo.db.Courses.find({'courseId': data['courseid']})
    if course:

        data = list(course)
        json_data = json.dumps(data, cls=CustomJSONEncoder)
        return json_data,201

    return jsonify({'message': 'No Course Found'}), 401

@app.route('/edit-course', methods=['POST'])
def editacourse():
    data = request.get_json()
    print(data)
    course = mongo.db.Courses.find({'courseId': data['courseid']})


    if course:



        update_data = {"$set": {"details": data['details']}}
        filter = {"courseId": data['courseid']}
        result =  mongo.db.Courses.update_one(filter, update_data)
        print(result)
        return jsonify({'message': 'Page Updated'}),201

    return jsonify({'message': 'No Course Found'}), 401

@app.route('/edit-course-module', methods=['POST'])
def editacoursemodule():
    data = request.get_json()
    print(data)
    course = mongo.db.Courses.find({'courseId': data['courseid']})


    if course:
        course = list(course)

        print(course[0])

        if "modules" not in course[0]:
            course[0]["modules"] = ""

        if course[0]["modules"] == "":
            course[0]["modules"]=[]


        while len(course[0]["modules"]) <= data['index']:
                course[0]["modules"].append(None)

        course[0]["modules"][data['index']] = data['moduleblock']

        print(course[0]["modules"],"---------" ,data['index'])

        update_data = {"$set": {"modules": course[0]["modules"]}}
        filter = {"courseId": data['courseid']}
        result =  mongo.db.Courses.update_one(filter, update_data)
        print(result)
        return jsonify({'message': 'Page Updated'}),201

    return jsonify({'message': 'No Course Found'}), 401

@app.route('/edit-course-assignment', methods=['POST'])
def editacourseassignment():
    data = request.get_json()
    print(data)
    course = mongo.db.Courses.find({'courseId': data['courseid']})

    if course:
        course = list(course)

        print(course[0])

        if "assignment" not in course[0]:
            course[0]["assignment"] = ""

        if course[0]["assignment"] == "":
            course[0]["assignment"]=[]


        while len(course[0]["assignment"]) <= data['index']:
                course[0]["assignment"].append(None)

        course[0]["assignment"][data['index']] = data['assignmentblock']

        print(course[0]["assignment"],"---------" ,data['index'])

        update_data = {"$set": {"assignment": course[0]["assignment"]}}
        filter = {"courseId": data['courseid']}
        result =  mongo.db.Courses.update_one(filter, update_data)
        print(result)
        return jsonify({'message': 'Page Updated'}),201

    return jsonify({'message': 'No Course Found'}), 401


@app.route('/edit-course-quiz', methods=['POST'])
def editacoursequiz():
    data = request.get_json()
    print(data)
    course = mongo.db.Courses.find({'courseId': data['courseid']})

    if course:
        course = list(course)

        print(course[0])

        if "quiz" not in course[0]:
            course[0]["quiz"] = ""

        if course[0]["quiz"] == "":
            course[0]["quiz"]=[]


        while len(course[0]["quiz"]) <= data['index']:
                course[0]["quiz"].append(None)

        course[0]["quiz"][data['index']] = data['quizblock']

        print(course[0]["quiz"],"---------" ,data['index'])

        update_data = {"$set": {"quiz": course[0]["quiz"]}}
        filter = {"courseId": data['courseid']}
        result =  mongo.db.Courses.update_one(filter, update_data)
        print(result)
        return jsonify({'message': 'Page Updated'}),201

    return jsonify({'message': 'No Course Found'}), 401

@app.route('/edit-course-assignment-grades', methods=['POST'])
def editacourseassignmentgrades():
    data = request.get_json()
    course = mongo.db.Courses.find({'courseId': data['courseid']})

    if course:
        course = list(course)


        for all in course[0]["assignment"][data['assignmentindex']]['submissions']:
            course[0]["assignment"][data['assignmentindex']]['submissions'][all]['grade']= data['gradeblock'][all]

        print(course[0]["assignment"][data['assignmentindex']]['submissions'])


        # course[0]["assignment"][data['index']] = data['assignmentblock']

        # print(course[0]["assignment"],"---------" ,data['index'])

        update_data = {"$set": {"assignment": course[0]["assignment"]}}
        filter = {"courseId": data['courseid']}
        result =  mongo.db.Courses.update_one(filter, update_data)
        return jsonify({'message': 'Page Updated'}),201

    return jsonify({'message': 'No Course Found'}), 401


@app.route('/edit-course-quiz-grades', methods=['POST'])
def editacoursequizgrades():
    data = request.get_json()
    course = mongo.db.Courses.find({'courseId': data['courseid']})

    if course:
        course = list(course)


        for all in course[0]["quiz"][data['quizindex']]['submissions']:
            course[0]["quiz"][data['quizindex']]['submissions'][all]['grade']= data['gradeblock'][all]

        print(course[0]["quiz"][data['quizindex']]['submissions'])


        # course[0]["assignment"][data['index']] = data['assignmentblock']

        # print(course[0]["assignment"],"---------" ,data['index'])

        update_data = {"$set": {"quiz": course[0]["quiz"]}}
        filter = {"courseId": data['courseid']}
        result =  mongo.db.Courses.update_one(filter, update_data)
        return jsonify({'message': 'Page Updated'}),201

    return jsonify({'message': 'No Course Found'}), 401


if __name__ == '__main__':
    app.run(debug=True)