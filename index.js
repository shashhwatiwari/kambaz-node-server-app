// import express from 'express'
// import Hello from "./Hello.js"
// import Lab5 from "./Lab5/index.js";
// import cors from "cors";
//
// const app = express()
// app.use(cors());
//
// Hello(app)
// Lab5(app)
// app.listen(process.env.PORT || 4000)

import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import session from "express-session";
import "dotenv/config";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import EnrollmentsRoutes from './Kambaz/Enrollments/routes.js';
import AssignmentsRoutes from './Kambaz/Assignments/routes.js';

const app = express()
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL || "http://localhost:5173",
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
EnrollmentsRoutes(app);
AssignmentsRoutes(app)
app.listen(process.env.PORT || 4000)