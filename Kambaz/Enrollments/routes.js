// import * as dao from "./dao.js";
// import * as enrollmentsDao from "../Enrollments/dao.js";
//
// export default function EnrollmentsRoutes(app) {
//     app.get("/api/enrollments", (req, res) => {
//         const enrollments = enrollmentsDao.getEnrollments();
//         res.send(enrollments);
//     });
//
//     app.post("/api/enrollments/:uid/:cid", (req, res) => {
//         const {uid, cid } = req.params;
//         const status = dao.enrollUserInCourse(uid, cid);
//         res.sendStatus(status);
//     });
//
//     app.delete("/api/enrollments/:uid/:cid", (req, res) => {
//         const {uid, cid } = req.params;
//         const status = dao.unenrollUserInCourse(uid, cid);
//         res.sendStatus(status);
//     });
// }

import * as enrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
    app.get("/api/enrollments", (req, res) => {
        const enrollments = enrollmentsDao.getEnrollments();
        res.json(enrollments);
    });

    app.post("/api/enrollments/:uid/:cid", (req, res) => {
        const { uid, cid } = req.params;
        try {
            const newEnrollment = enrollmentsDao.enrollUserInCourse(uid, cid);
            res.json(newEnrollment);  // Return the enrollment object
        } catch (error) {
            res.status(500).json({ error: "Failed to enroll user" });
        }
    });

    app.delete("/api/enrollments/:uid/:cid", (req, res) => {
        const { uid, cid } = req.params;
        try {
            const status = enrollmentsDao.unenrollUserInCourse(uid, cid);
            if (status === 200) {
                res.json({ message: "Successfully unenrolled" });
            } else {
                res.status(404).json({ error: "Enrollment not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to unenroll user" });
        }
    });
}