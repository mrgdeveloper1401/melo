import express from 'express';


// define router
const router = express.Router();

// define route admin user
router.get("/admin-users/",  (req, res) => {
    res.send("ok")
});

router.get("/admin-users/:id", (req, res) => {
    res.send(`Get admin user with ID: ${req.params.id}`);
});

router.post("/admin-users/", (req, res) => {
    res.send("Create new admin user");
});

router.put("/admin-users/:id", (req, res) => {
    res.send(`Update admin user with ID: ${req.params.id}`);
});

router.patch("/admin-users/:id", (req, res) => {
    res.send(`Partially update admin user with ID: ${req.params.id}`);
});

router.delete("/admin-users/:id", (req, res) => {
    res.send(`Delete admin user with ID: ${req.params.id}`);
});

export default router;
