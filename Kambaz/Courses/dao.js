// import Database from "../Database/index.js";
import model from "./model.js";
import EnrollmentModel from "../Enrollments/model.js";
import ModuleModel from "../Modules/model.js";
import AssignmentModel from "../Assignments/model.js";
import { v4 as uuidv4 } from "uuid";
export function findAllCourses() {
    return model.find();
}
export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
        enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
}
export function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    newCourse.image = "course.jpg"
    return model.create(newCourse);

}
export async function deleteCourse(courseId) {
    await EnrollmentModel.deleteMany({ course: courseId });
    await ModuleModel.deleteMany({ course: courseId });
    await AssignmentModel.deleteMany({ course: courseId });
    // await QuizModel.deleteMany({ course: courseId });
    return model.deleteOne({ _id: courseId });
}


export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}

export function findCourseById(courseId) {
    return model.findOne({ _id: courseId });
}



