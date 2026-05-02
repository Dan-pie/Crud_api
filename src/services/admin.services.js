const adminRepo = require("../repositories/admin.repository");

exports.seeAllProfiles = async () => {
  try {
    const result = await adminRepo.seeAllProfiles();
    return result.rows;
  } catch (err) {
    next(err)
  }
};
