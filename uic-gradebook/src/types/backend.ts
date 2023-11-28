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

export interface db_Class_search {
    department: string;
    number: number;
    name: string;
    instructor: string;
}

export interface db_Grade extends db_Class {
    userGrade: string;
    isFav: boolean;
}

export interface db_User {
    id: number;
    name: string;
    surname: string;
    email: string;
    gpa: number;
}
export interface db_User_grade{
    user: number;
    grade: string;
    semester: string;
    year: number;
    department: string;
    instructor: string;
    number: number;
    name: string;
}