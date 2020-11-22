
class FirestoreSingleton {

    static init(admin) {
        if (!FirestoreSingleton.instance) {
            FirestoreSingleton.instance = admin.firestore()
        }

        return FirestoreSingleton.instance
    }

}

class StorageSingleton {

    static init(admin) {
        if (!StorageSingleton.instance) {
            StorageSingleton.instance = admin.storage().bucket()
        }

        return StorageSingleton.instance
    }

}

module.exports = {
    firestore: FirestoreSingleton,
    storage: StorageSingleton
}