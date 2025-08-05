
import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;


    const existingEnrollment = enrollments.find(
        (enrollment) => enrollment.course === courseId && enrollment.user === userId
    );

    if (existingEnrollment) {
        return existingEnrollment; // Return existing enrollment
    }


    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    enrollments.push(newEnrollment);
    return newEnrollment; // Return the new enrollment object
}

export function unenrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    const initialLength = enrollments.length;

    Database.enrollments = enrollments.filter(
        (enrollment) => !(enrollment.course === courseId && enrollment.user === userId)
    );


    return Database.enrollments.length < initialLength ? 200 : 404;
}

export function getEnrollments() {
    const { enrollments } = Database;
    return enrollments;
}