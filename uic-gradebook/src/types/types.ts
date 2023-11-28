export type FriendStatus = "accepted" | "requested" | "pending" | "none"

export interface Friend {
  id: number;
  status?: FriendStatus;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  gpa: number;
  profilePic?: string;
}

export interface DisplayFriend {
  id: number;
  name: string;
  surname: string;
  status: FriendStatus;
  profilePic?: string;
}

export interface Class {
  id: number;
  name: string;
  teacher: string;
  semester: string;
  code: number;
  department: string;
  grade: string;
  distribution?: Distribution;
  isFav?: boolean;
}

export interface Distribution {
  a: number;
  b: number;
  c: number;
  d: number;
  f: number;
}

export interface Grade{
  user: number ;
  value: string ;
  semester: string ;
  year: number;
  department: string ;
  number: number ;
  name: string ;
  instructor: string ;
}
