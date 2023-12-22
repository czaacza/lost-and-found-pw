from pymongo import MongoClient

if __name__ == '__main__':
    # connection to mongodb first part before : is name of servises in docker-compose file(mongodb)
    client = MongoClient("mongodb://mongodb:27017/")
    # creating new db with your name (good_try) or connecting to db with your name (good_try)
    db = client["good_try"]

    # creating new collection with your name (collection_good_try)
    # or connecting to collection with your name (collection_good_try)
    collection = db["collection_good_try"]

    # insert values to db
    collection.insert_one({"hello": "Hello world, programm works"})

    #find document with this key : value ("hello": "Hello world, programm works")
    document = collection.find_one({"hello": "Hello world, programm works"})
    if document:
        print(document["hello"])

    else:
        print("Document not found")