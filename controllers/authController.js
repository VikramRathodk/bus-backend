const {generateToken} = require('../utils/jwt');
const db = require("../config/db");


const register = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    console.log(`email: ${email} password: ${password}`);

    if (!email || !password) {
        return res.status(400).json({
            status: false,
            message: 'Email or password is required'
        });
    }

    const [existingUser] = await db.execute(
        `SELECT *
         FROM users
         WHERE email = ?`, [email],
    )
    if (existingUser > 0) {
        return res.status(400).json({
            status: false,
            message: "Account is already in use.Try using different email address"
        })
    }

    await db.query('INSERT INTO users (first_name,last_name,email,password) VALUES(?,?,?,?)', [firstName, lastName, email, password])

    return res.status(201).json({
        status: true,
        message: 'Users Registration successfully.',
    })
}

const login = async (req, res) => {
    const {email, password} = req.body;
    console.log(`Login: email: ${email} password: ${password}`);

    if(!email || !password) {
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

    const [rows] = await db.query(
        `SELECT * FROM users WHERE email = ?`,
        [email]
    );

    if (rows.length === 0) {
        return res.status(400).json({
            status: false,
            message: 'User does not exist',
        });
    } else {
        const user = rows[0];
        const token = generateToken(user.id);
        return res.status(200).json({
            status: true,
            message: 'Login successfully.',
            token: token,
            user: user,
        });
    }


}
module.exports = {
    register,
    login,
}