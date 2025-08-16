export const signupController = (req, res, next) => {
    res.json(
        {
            "status": "success",
            "message": "signup route are working"
        }
    );
}

export const loginController = async (req, res, next) => {
    await res.json(
        {
            "status": "success",
            "message": "login route are working"
        }
    );
}
