const admin = require("firebase-admin");
var serviceAccount = require("./next-quiz-app-35c4b-firebase-adminsdk-k56ie-9996378457.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const auth = admin.auth();

const FirebaseAdminService = { admin, auth };

module.exports = FirebaseAdminService;