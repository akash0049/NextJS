const FirebaseAdminService = require("../firebase_admin_config");

const isAuthorized = async (req, res, next) => {
    try {
        const response = await FirebaseAdminService.auth.verifyIdToken(req.headers.access_token);
        if (response && response.uid) {
            next();
            return;
        }
        res.status(403).json({ message: 'Not Authorized' })
    } catch (error) {
        res.status(500).json({ message: 'Not Authorized' })
    }
}

module.exports = { isAuthorized };