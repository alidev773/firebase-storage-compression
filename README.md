# Description:

In this repo i am listening to firestore images collection.On each new document addition i am compressing image for newly added document and uploading compressed image to firebase bucket and savng compressed image for new document added to firestore.


# LOOM VIDEO EXPLAN

[LOOM VIDEO EXPLAIN](https://www.loom.com/share/531009ced61445b18f7bfe5673241cff?sid=b4abc970-8371-4d3c-ab8a-67e7bbc09c1d)

# Client
client folder contains the frontend using mui

## Installation

```bash
npm i
```

## Run the development server
```bash
npm run dev
```

## Build 
```bash
npm run build
```

# Server

## NOTE: CREATE SERVICE ACCOUNT JSON FILE AND PASTE THE SECRETS

Paste the firebase service account configuration to server/src/service-account.json file

Server is node express, containg the compression logic
## Installation

```bash
npm i
```

## Run the development server
```bash
npm run dev
```

## Build 
```bash
npm run build
```


## Tech Stack

**Server:** Node

**Database:** Firestore

**Additional Services:** Firebase Bucket

## Node Version

**v20.x.x**