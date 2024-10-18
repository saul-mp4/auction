const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const prisma = new PrismaClient();

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: payload.id,
          },
        });
        done(null, user);
      } catch (e) {
        done(e, false, "Anouthorized");
      }
    },
  ),
);

module.exports = passport;
