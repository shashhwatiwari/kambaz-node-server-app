import Database from "../Database/index.js";
import { v4 as uuidv4 } from 'uuid';

export function findAllAssignments() {
    return Database.assignments;
}

export function findAssignmentsForCourse(courseId) {
    const { assignments } = Database;
    const assignmentsForCourse = assignments.filter((a) => a.course === courseId);
    return assignmentsForCourse;
}

export function findAssignment(cid, aid) {
    const { assignments } = Database;
    const assignment = assignments.filter((a) => a.course === cid && a._id === aid);
    return assignment;
}

export function createAssignment(assignment) {
    const newAssignment = assignment;
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}

export function deleteAssignment(cid, aid) {
    const assignments = Database.assignments;
    Database.assignments = assignments.filter((a) => !(a.course === cid && a._id === aid))
    return 200;
}

export function updateAssignment(assignmentUpdates) {
    const assignments = Database.assignments;
    const assignment = assignments.find((a) => a.course === assignmentUpdates.course && a._id === assignmentUpdates._id);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
}




