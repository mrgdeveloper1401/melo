import express from 'express';


// define router
const router = express.Router();

// create
router.post(
    "/auth/create",
    (req, res) => {
        console.log("object");
    }
)

// login
router.post(
    "/auth/login_by_username/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_otp/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/verify_request_otp/",
        (req, res) => {
        console.log("object");
    }
)

// profile
router.get(
    "/auth/profile/",
        (req, res) => {
        console.log("object");
    }
)
router.patch(
    "/auth/profile/:id",
        (req, res) => {
        console.log(`object ${req.params.id}`);
    }
)
router.put(
    "/auth/profile/:id",
        (req, res) => {
        console.log(`object ${req.params.id}`);
    }
)

// change email
router.post(
    "/auth/request_change_email/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_verify_email/",
        (req, res) => {
        console.log("object");
    }
)

// change phone
router.post(
    "/auth/request_change_phone/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_verify_change_phone/",
        (req, res) => {
        console.log("object");
    }
)

// reset password
router.post(
    "/auth/change_password/",
        (req, res) => {
        console.log("object");
    }
)

// reset password by email
router.post(
    "/auth/request_reset_password_by_email/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_verify_reset_password_by_email/",
        (req, res) => {
        console.log("object");
    }
)

// reset password by phone
router.post(
    "/auth/request_reset_password_by_phone/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_verify_reset_password_by_phone/",
        (req, res) => {
        console.log("object");
    }
)

// send link into email for reset password
router.post(
    "/auth/request_send_link_into_email/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_verify_send_link_into_email/",
        (req, res) => {
        console.log("object");
    }
)

// send link for into phone for reset password
router.post(
    "/auth/request_send_link_into_phone/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_verify_send_link_into_phone/",
        (req, res) => {
        console.log("object");
    }
)
export default router;