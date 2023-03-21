const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, deleteUser, updateUserRole } = require("../controllers/userController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/userProfile").get(isAuthenticated, getUserDetails);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/userProfile/update").put(isAuthenticated, updateProfile);
router.route("/admin/users").get(isAuthenticated, authorizeRoles("admin"), getAllUser);
router.route("/admin/user/:id").get(isAuthenticated, authorizeRoles("admin"), getSingleUser).
    put(isAuthenticated, authorizeRoles("admin"), updateUserRole).
    delete(isAuthenticated, authorizeRoles("admin"), deleteUser)



module.exports = router;