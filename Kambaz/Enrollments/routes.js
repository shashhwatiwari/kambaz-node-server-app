import * as dao from "./dao.js";
export default function EnrollmentRoutes(app) {

    // app.get("/api/enrollments", (req, res) => {
    //     const enrollments = dao.findAllEnrollments();
    //     res.send(enrollments);
    // });


    app.get("/api/users/:userId/enrollments", async (req, res) => {
        const { userId } = req.params;
        const enrollments = await dao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    });


    app.post("/api/users/:userId/courses/:courseId/enroll", (req, res) => {
        const { userId, courseId } = req.params;
        const result = dao.createEnrollment(userId, courseId);

        if (result.error) {
            res.status(400).send(result);
        } else {
            res.status(201).send(result);
        }
    }); 

    // DELETE 
    app.delete("/api/users/:userId/courses/:courseId/unenroll", (req, res) => {
        const { userId, courseId } = req.params;
        const result = dao.deleteEnrollment(userId, courseId);
        res.send(result);
    });
}

