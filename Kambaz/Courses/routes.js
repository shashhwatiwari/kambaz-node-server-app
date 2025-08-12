// import * as dao from "./dao.js";
// import * as modulesDao from "../Modules/dao.js";
//
// export default function CourseRoutes(app) {
//     app.get("/api/courses", (req, res) => {
//         const courses = dao.findAllCourses();
//         res.send(courses);
//     });
//
//     app.get("/api/courses/:cid", (req, res) => {
//         const { cid } = req.params;
//         const status = dao.getCourse(cid);
//         res.send(status);
//     });
//
//     app.delete("/api/courses/:courseId", (req, res) => {
//         const { courseId } = req.params;
//         const status = dao.deleteCourse(courseId);
//         res.send(status);
//     });
//
//     app.put("/api/courses/:courseId", (req, res) => {
//         const { courseId } = req.params;
//         const courseUpdates = req.body;
//         const status = dao.updateCourse(courseId, courseUpdates);
//         res.send(status);
//     });
//
//     app.get("/api/courses/:courseId/modules", (req, res) => {
//         const { courseId } = req.params;
//         const modules = modulesDao.findModulesForCourse(courseId);
//         res.json(modules);
//     });
//
//     app.post("/api/courses/:courseId/modules", (req, res) => {
//         const { courseId } = req.params;
//         const module = {
//             ...req.body,
//             course: courseId,
//         };
//         const newModule = modulesDao.createModule(module);
//         res.send(newModule);
//     });
//
//
// }
//

import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
    app.get("/api/courses", async (req, res) => {
    try {
        console.log("GET /api/courses called"); // ADD THIS
        const courses = await dao.findAllCourses();
        console.log("Courses found:", courses); // ADD THIS
        res.send(courses);
    } catch (error) {
        console.error("Error in courses route:", error); // ADD THIS
        res.status(500).json({ error: error.message });
    }
});

    app.get("/api/courses/:cid", async (req, res) => {
        try {
            const { cid } = req.params;
            const course = await dao.getCourse(cid);
            if (!course) {
                res.status(404).json({ message: "Course not found" });
                return;
            }
            res.send(course);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.delete("/api/courses/:courseId", async (req, res) => {
        try {
            const { courseId } = req.params;
            const status = await dao.deleteCourse(courseId);
            res.send(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.put("/api/courses/:courseId", async (req, res) => {
        try {
            const { courseId } = req.params;
            const courseUpdates = req.body;
            const status = await dao.updateCourse(courseId, courseUpdates);
            res.send(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/courses/:courseId/modules", async (req, res) => {
        try {
            const { courseId } = req.params;
            const modules = await modulesDao.findModulesForCourse(courseId);
            res.json(modules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post("/api/courses/:courseId/modules", async (req, res) => {
        try {
            const { courseId } = req.params;
            const module = {
                ...req.body,
                course: courseId,
            };
            const newModule = await modulesDao.createModule(module);
            res.send(newModule);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
        await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    }
    res.json(course);
    });

    const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
    };
    app.get("/api/courses/:cid/users", findUsersForCourse);
}