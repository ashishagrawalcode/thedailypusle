// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// Bouncer 1: Are you logged in?
exports.verifyToken = (req, res, next) => {
    // 1. Look at the incoming request headers for the wristband
    const authHeader = req.headers['authorization'];
    
    // 2. If no wristband, kick them out
    if (!authHeader) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    // Usually, tokens are sent as "Bearer abc123def..."
    const token = authHeader.split(" ")[1];

    try {
        // 3. Verify the signature using our Secret Key
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Attach the decoded user data to the request so the next function can see it
        req.user = decodedPayload; 
        
        // 5. Open the door and let them through to the Controller!
        next(); 
    } catch (err) {
        // If the signature is fake or expired, it triggers this error
        return res.status(403).json({ error: "Invalid or expired token." });
    }
};

// Bouncer 2: Are you an Admin?
exports.requireAdmin = (req, res, next) => {
    // We already ran verifyToken, so req.user exists now
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "Forbidden: You are not an Admin." });
    }
    
    // If they are an admin, let them through
    next();
};