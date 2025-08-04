import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function EnrollmentsRoutes(app) {
    app.get("/api/enrollments", (req, res) => {
        const enrollments = enrollmentsDao.getEnrollments();
        res.send(enrollments);
    });

    app.post("/api/enrollments/:uid/:cid", (req, res) => {
        const {uid, cid } = req.params;
        const status = dao.enrollUserInCourse(uid, cid);
        res.sendStatus(status);
    });

    app.delete("/api/enrollments/:uid/:cid", (req, res) => {
        const {uid, cid } = req.params;
        const status = dao.unenrollUserInCourse(uid, cid);


        res.sendStatus(status);
    });
}