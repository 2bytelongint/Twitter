import JWT from 'passport-jwt'
import { SECRETORKEY } from './serverConfig.js';
import User from '../models/user.js'

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : SECRETORKEY
}

export const passportAuth = (passport) => {
    passport.use(
        new JwtStrategy(
            opts, async (jwt_payload, done) => {
                try {
                    const user = await User.findById(jwt_payload.id);
                    
                    if (user) {
                        return done(null, user)};
                    return done(null, false);
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    )
}