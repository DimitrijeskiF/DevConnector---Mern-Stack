const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('./../../models/User');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { password, email, name } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ errors: [{ msg: 'User already exists!' }] });
        }

        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
        user = new User({ name, email, password, avatar });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const payload = {
            user: {
                id: user.id,
            }
        }
        jwt.sign(payload, config.get('jwtSecret'),
            { expiresIn: 360000 },
            (error, token) => {
                if (error) {
                    throw error
                }
                res.json({token})
            });
    } catch (error) {
    console.log('error', error.message);
    res.status(500).send(error.message);
}
});


module.exports = router;