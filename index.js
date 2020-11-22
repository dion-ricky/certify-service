const admin = require('firebase-admin')
const { createCanvas, registerFont, loadImage, Image } = require('canvas')

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: "certify-service.appspot.com"
})

const db = admin.firestore();
const bucket = admin.storage().bucket();

const configRef = db.collection("cert-config").doc("voksnmshd31f3l6uLgVN");
configRef.get().then(doc => {
    if (!doc.exists) {
        console.log("No document");
    } else {
        console.log("Document data:", doc.data());
    }
});

async function downloadFile(bucketName, srcFilename, destFilename) {
    const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination: destFilename,
    };
  
    // Downloads the file
    await bucket.file(srcFilename).download(options);
  
    console.log(
      `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
    );
}

downloadFile(
    "certify-service", "fonts/GoogleSans-Regular-v1.27.ttf", "./google.ttf"
).catch(console.error);

registerFont('OpenSans-Regular.ttf', {family: 'Open Sans'})

const canvas = createCanvas(2382, 1684)
const ctx = canvas.getContext('2d')

const img = new Image()
img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
img.onerror = err => { throw err }
img.src = 'exp-noname-sertif.png'

ctx.font = '100pt "Open Sans"'
ctx.textAlign = 'center';
ctx.fillStyle = '#202020';

let x = canvas.width / 2;
let y = canvas.height / 2;

ctx.fillText("Dion Ricky Saputra", x, y);

const fs = require('fs')
const out = fs.createWriteStream(__dirname + '/test.png')
const stream = canvas.createPNGStream()
stream.pipe(out)
out.on('finish', () =>  console.log('The PNG file was created.'))