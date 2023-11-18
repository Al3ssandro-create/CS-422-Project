export interface db_Class {
    id: number;
    year: number;
    semester: string;
    department: string;
    number: number;
    name: string;
    instructor: string;
    a: number;
    b: number;
    c: number;
    d: number;
    f: number;
    w: number;
}

export interface db_Grade extends db_Class {
    grade: string;
    isFav: boolean;
}

export interface db_User {
    id: number;
    name: string;
    surname: string;
    email: string;
    gpa: number;
}