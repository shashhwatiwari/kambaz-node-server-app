import * as dao from "./dao.js";

export default function AssignmentsRoutes(app) {
    app.get("/api/assignments", (req, res) => {
        const assignments = dao.findAllAssignments();
        res.json(assignments);
    });

    app.get("/api/assignments/:cid", (req, res) => {
        const  { cid } = req.params;
        const assignments = dao.findAssignmentsForCourse(cid);
        res.json(assignments);
    });

    app.get("/api/assignments/:cid/:aid", (req, res) => {
        const  { cid, aid } = req.params;
        const assignment = dao.findAssignment(cid, aid);
        res.send(assignment);
    });

    app.post("/api/assignments", (req, res) => {
        const assignment = dao.createAssignment(req.body);
        res.send(assignment);
    });

    app.delete("/api/assignments/:cid/:aid", (req, res) => {
        const { cid, aid } = req.params;
        const status = dao.deleteAssignment(cid, aid);
        res.send(status);
    });


    app.put("/api/assignments", (req, res) => {
        const assignmentUpdates = req.body;
        const status = dao.updateAssignment(assignmentUpdates);
        res.send(status);
    });

}