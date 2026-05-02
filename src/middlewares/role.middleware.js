module.exports = (roles) => (req, res, next) => {
    if (!req.user) {
      return next(new Error("UNAUTHENTICATED"));
    }

    const userRole = req.user.role;

    if (!userRole) {
      return next(new Error("ROLE_NOT_DEFINED"));
    }

    const allowedRoles =  Array.isArray(roles) ? roles : [roles]
   


    if(!allowedRoles.includes(userRole)){
        throw new Error('UNAUTHORIZED')
    }

    next()

}