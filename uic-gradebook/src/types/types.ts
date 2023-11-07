export type FriendStatus = "pending" | "accepted" | "requested";

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
  favClasses: number[]; // just save the id of the class instead of the whole class
  friends: Friend[];
}

export interface DisplayFriend extends Friend, User {}

export interface Class {
  id: number;
  name: string;
  teacher: string;
  semester: string;
  distribution?: Distribution;
}

export interface DisplayClass {
  name: string;
  teacher: string;
}

export interface Distribution {
  a: number;
  b: number;
  c: number;
  d: number;
  f: number;
}
