import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findAllAssignments() {
    return model.find();
}

export function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
}

export function findAssignmentById(assignmentId) {
    return model.findOne({ _id: assignmentId });
}

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return model.create(newAssignment);
}

export async function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
}

export function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
}