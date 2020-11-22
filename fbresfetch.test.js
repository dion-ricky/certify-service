const admin = require('firebase-admin')
const { storage } = require('./firebase/service')
const resource = require('./util/resource-fetcher')

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: "certify-service.appspot.com"
})

const bucket = storage.init(admin)
const firebaseRes = resource.initFirebaseStorage(bucket)

firebaseRes.downloadFile("fonts/GoogleSans-Regular-v1.27.ttf", "google.ttf")