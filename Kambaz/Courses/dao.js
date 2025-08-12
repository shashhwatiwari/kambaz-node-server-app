//import Database from "../Database/index.js";
import { v4 as uuidv4 } from 'uuid';
import model from "./model.js";

export function findAllCourses() {
    return model.find;
}

export function getCourse(cid) {
    return model.findById(cid);
}

export async function findCoursesForEnrolledUser(userId) {
    // First, find all enrollments for the user
    const enrollments = await enrollmentModel.find({ user: userId });

    // Extract course IDs from enrollments
    const courseIds = enrollments.map(enrollment => enrollment.course);

    // Find all courses that match these IDs
    const enrolledCourses = await model.find({ _id: { $in: courseIds } });

    return enrolledCourses;
}

export function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    newCourse.image = "course.jpg";
    return model.create(newCourse);
}

export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}


//
// export function findCoursesForEnrolledUser(userId) {
//     const { courses, enrollments } = Database;
//     const enrolledCourses = courses.filter((course) =>
//         enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
//     return enrolledCourses;
// }
//
// export function createCourse(course) {
//     const newCourse = { ...course, _id: uuidv4() };
//     Database.courses = [...Database.courses, newCourse];
//     return newCourse;
// }
//
// export function deleteCourse(courseId) {
//     const { courses, enrollments } = Database;
//     Database.courses = courses.filter((course) => course._id !== courseId);
//     Database.enrollments = enrollments.filter(
//         (enrollment) => enrollment.course !== courseId
//     );
// }
//
// export function updateCourse(courseId, courseUpdates) {
//     const { courses } = Database;
//     const course = courses.find((course) => course._id === courseId);
//     Object.assign(course, courseUpdates);
//     return course;
// }



