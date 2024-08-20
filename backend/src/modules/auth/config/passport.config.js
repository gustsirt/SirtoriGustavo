import configEnv from "../../../config/env.js";
import passport from "passport";
import jwt from "passport-jwt";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2"
import Service from "../logic/service.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  // JWT
  passport.use("jwt", new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: configEnv.jwt_code,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(new LinkedInStrategy({
    clientID: configEnv.linkedin_client_id,
    clientSecret: configEnv.linkedin_client_secret,
    callbackURL: "http://localhost:8080/v1/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, async function(accessToken, refreshToken, profile, done) {
    const service = new Service();
    const user = await service.registerOrLogin(profile);
    return done(null, user);
  }));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
};

// https://github.com/bruceskills/linkedin-login-using-nodejs-and-passport
// https://www.youtube.com/watch?v=4zCYJRVGq2A
// https://levelup.gitconnected.com/step-by-step-guide-to-authenticate-users-with-linkedin-in-your-express-app-10af68b91b13

export default initializePassport;