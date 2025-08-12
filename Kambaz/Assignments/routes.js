import * as dao from "./dao.js";
export default function AssignmentRoutes(app) {

    app.get("/api/assignments", async (req, res) => {
        const assignments = await dao.findAllAssignments();
        res.send(assignments);
    });

    app.get("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignment = await dao.findAssignmentById(assignmentId);
        if (assignment) {
            res.send(assignment);
        } else {
            res.status(404).send({ error: "Assignment not found" });
        }
    });

    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.findAssignmentsForCourse(courseId);
        res.send(assignments);
    });

    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = await dao.createAssignment(assignment);
        res.send(newAssignment);
    });

    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.deleteAssignment(assignmentId);
        res.send(status);
    });

    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status = await dao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(status);
    });
}
