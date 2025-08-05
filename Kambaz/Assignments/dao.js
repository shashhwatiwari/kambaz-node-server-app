import Database from "../Database/index.js";
import { v4 as uuidv4 } from 'uuid';

export function findAllAssignments() {
    return Database.assignments;
}

export function findAssignmentsForCourse(courseId) {
    const { assignments } = Database;
    return assignments.filter((a) => a.course === courseId);
}

export function createAssignment(assignment) {
    const newAssignment = {
        ...assignment,
        _id: uuidv4()
    };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}

export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((a) => a._id !== assignmentId);
}

export function updateAssignment(assignmentId, updates) {
    const { assignments } = Database;
    const assignment = assignments.find((a) => a._id === assignmentId);
    if (assignment) {
        Object.assign(assignment, updates);
        return assignment;
    }
    return null;
}