const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addSalt = '‘ß˚ç';

const GET_USER_DB = (param) => `SELECT * FROM users WHERE ${param} = $1`;
const INSERT_USER_DB = 'INSERT INTO users (email, username, token, hash, salt) VALUES ($1, $2, $3, $4, $5)';

class User {
    static async permissions(req, res) {
        const {data, err} = await this.db.query(GET_USER_DB('token'), [req.token]);

        if (err) {
            res.status(400).json(err.message);
            return false;
        }

        if (data.rows.length === 0) {
            res.status(401).json('');
            return false;
        }

        return true;
    }


    static async signUpUser(req, res) {
        const body = req.body;
        let answer = await User.conditionUser(body, this.db);

        if (answer.err) {
            res.status(400).json(answer.err.message);
            return;
        }

        if (answer.rows.length !== 0) {
            res.status(400).json(`This email ${body.email} is exist.`);
            return;
        }

        const {email, username, password} = body;
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password + addSalt, salt);
        const token = User.getToken(email, username, hash);

        answer = await this.db.query(INSERT_USER_DB, [email, username, token, hash, salt]);

        if (answer.err) {
            res.status(400).json(answer.err.message);
            return;
        }

        res.send(token);
    }


    static async signInUser(req, res) {
        const {email, password} = req.body;
        const {data, err} = await this.db.query(GET_USER_DB('email'), [email]);

        if (err) {
            res.status(400).json(err.message);
            return;
        }

        if (data.rows.length === 0) {
            res.status(400).json(`This email ${email} isn't exist.`);
            return;
        }

        const user = data.rows[0];
        if (bcrypt.compareSync(password + addSalt, user.hash)) {
            res.send(user.token);
        } else {
            res.send('Wrong password.');
        }
    }


    static getToken(email, username, hash) {
        return jwt.sign({ email, username }, process.env.JWT_SECRET + hash || 'M7BUb2Oyhll2ciPsWKQw0KZPJ9CEoc9gcVpVb1uaVCVyHKTB9XiJs0BTngtep45' + hash);
    }


    static async conditionUser({email, username, password, repeatPassword}, db) {
        return new Promise(resolve => {
            if (typeof(email) !== 'string'
              || !User.validateEmail(email)
              || typeof(username) !== 'string'
              || username.length < 6
              || typeof(password) !== 'string'
              || typeof(repeatPassword) !== 'string'
              || password !== repeatPassword
              || password.length < 8) {
                resolve({err: {message: 'Name, email or pass are wrong'}});
            }

            resolve(db.query(GET_USER_DB, [email]));
        });
    }


    static validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}


module.exports = User;
