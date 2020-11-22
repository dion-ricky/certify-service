const os = require('os')

class FirebaseStorageFetcher {

    constructor(bucket, dest=null) {
        this.bucket = bucket
        this.dest = (dest == null) ? os.tmpdir() + '/' : dest
        FirebaseStorageFetcher.instance = this
    }

    async downloadFile(srcFilename, destFilename) {
        const options = {
          destination: this.dest + destFilename,
        };

        await this.bucket.file(srcFilename).download(options);
      
        console.log(
          `gs://default_bucket/${srcFilename} downloaded to ${this.dest + destFilename}.`
        );
    }

}

class FirebaseStorageFetcherSingleton {

    static getInstance(bucket) {
        if (!FirebaseStorageFetcher.instance) {
            return new FirebaseStorageFetcher(bucket)
        }
        
        return FirebaseStorageFetcher.instance
    }

}

function initFirebaseStorage(bucket) {
    return FirebaseStorageFetcherSingleton.getInstance(bucket)
}

function initHttpResourceFetcher() {

}

module.exports = {
    initFirebaseStorage, initHttpResourceFetcher
}