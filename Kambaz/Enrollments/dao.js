import model from "./model.js";
export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user, course) {
  return model.create({ user, course, _id: `${user}-${course}` });
}
export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}
export async function findEnrollmentsForUser(userId) {
  return await model.find({ user: userId });
}

// import Database from "../Database/index.js";
// import { v4 as uuidv4 } from "uuid";


// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
// }

// export function findAllEnrollments() {
//   return model.find();
// }

// export function findEnrollmentsForUser(userId) {
//   return Database.enrollments.filter((enrollment) => enrollment.user === userId);
// }

// export function createEnrollment(userId, courseId) {
//   const newEnrollment = {
//     _id: uuidv4(),
//     user: userId,
//     course: courseId
//   };

//   Database.enrollments = [...Database.enrollments, newEnrollment]; 
//   return newEnrollment;
// }

// export function deleteEnrollment(userId, courseId) {
//   const { enrollments } = Database;

//   Database.enrollments = enrollments.filter(
//     (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
//   );

//   return { status: "Enrollment removed successfully" };
// }
