const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');


const router = express.Router();

const secret = 'secretKey';

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret
        },
        async (payload, done) => {
            try {
                const user = await User.findById(payload.id);
                if (!user) {
                    return done(null, false);
                }
                done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
    )
);

const authMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    try {
        await user.save();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !user.isValidPassword(password)) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id }, secret);
    res.json({ token });
});

module.exports = router;