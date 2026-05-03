const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // The bridge to PostgreSQL

// 1. SIGNUP: Create a new Editor in the Database
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email is already taken
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use.' });
        }

        // Scramble password and save to PostgreSQL
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role',
            [name, email, passwordHash]
        );

        res.status(201).json({ message: 'Signup successful!', user: newUser.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during signup.' });
    }
};

// 2. LOGIN: Verify credentials against PostgreSQL
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user in PostgreSQL
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found!" });
        }
        const user = userResult.rows[0];

        // Compare the typed password to the Vault's scrambled hash
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Wrong password!" });
        }

        // Create the VIP Pass (JWT)
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Welcome back!",
            token: token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during login.' });
    }
};