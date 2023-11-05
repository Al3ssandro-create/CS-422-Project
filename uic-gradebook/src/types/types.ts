export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    gpa: number;
    favClasses: Class[];   
}

export interface Friend extends User {
    status: "pending" | "accepted" | "send"
}

export interface Class {
    id: number;
    name: string;
    teacher: string;
    semester: string;
    distribtuion?: Distribution;
}

export interface Distribution {
    a: number;
    b: number;
    c: number;
    d: number;
    f: number;
}