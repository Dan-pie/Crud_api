const {seeAllProfiles} = require("../services/admin.services")


exports.seeAllUsers = async (req, res, next) => {
    try {
        const result = await seeAllProfiles()
        console.log(result)
        res.json(result)
    } catch (err) {
        next(err)
    }
}