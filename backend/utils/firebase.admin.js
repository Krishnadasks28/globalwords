import admin from 'firebase-admin'

import serviceAcount from '../config/globalwords-f6ba8-firebase-adminsdk-cjp50-91c55a9ec5.json'

admin.initializeApp({
    credential:admin.credential.cert(serviceAcount),
    databaseURL:'https://globalwords-f6ba8-default-rtdb.firebaseio.com/'
})

export default admin