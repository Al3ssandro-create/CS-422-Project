import {
  Class,
  User,
  FriendStatus,
  DisplayFriend
} from "../types/types";

import { db_Class, db_Grade, db_User } from "../types/backend";

const endpoint = "http://localhost:8080";

function db_user_to_front(_user: db_User): User {
  return {
    id: _user.id,
    name: _user.name,
    surname: _user.surname,
    email: _user.email,
    gpa: _user.gpa,
  };
}

function db_class_to_front(course: db_Class): Class {
  return {
    id: course.id,
    name: course.name,
    teacher: course.instructor,
    semester: course.semester + " " + course.year,
    code: course.number,
    department: course.department,
    distribution: {
      a: course.a,
      b: course.b,
      c: course.c,
      d: course.d,
      f: course.f,
    },
  };
}

function db_grade_to_front(grade: db_Grade): Class {
  return {
    id: grade.id,
    name: grade.name,
    teacher: grade.instructor,
    semester: grade.semester + " " + grade.year,
    code: grade.number,
    department: grade.department,
    isFav: grade.isFav,
    distribution: {
      a: grade.a,
      b: grade.b,
      c: grade.c,
      d: grade.d,
      f: grade.f,
    },
  };
}

export const getUser = async (userId: string): Promise<User | undefined> => {
  if (userId === undefined) return undefined;

  const res = await fetch(`${endpoint}/api/user/${userId}`);

  if (res.status === 404) return undefined;

  const user = await res.json();

  return db_user_to_front(user);
};

export const getFavCourses = async (userId: number): Promise<Class[]> => {
  if (userId === undefined) return [];

  const res = await fetch(`${endpoint}/api/user/${userId}/fav_courses`);

  if (res.status === 404) return [];

  const favCourses: db_Class[] = await res.json();

  return favCourses.map((course: db_Class) => {
    return db_class_to_front(course);
  });
};

export const getSearchCourses = async (
  department: string,
  query: string,
  id: number
): Promise<{ res: Class[]; id: number }> => {
  const target = query.toLowerCase();

  const res = await fetch(`${endpoint}/api/courses/${department}/${target}`);

  const courses: db_Class[] = await res.json();

  return {
    res: courses.map((course: db_Class) => {
      return db_class_to_front(course);
    }),
    id,
  };
};

export const getCourses = async (
  userId: number,
  department: string,
  code: number,
  instructor: string
): Promise<Class[]> => {
  const res = await fetch(
    `${endpoint}/api/courses/${userId}/${department}/${code}/${instructor}`
  );

  if (res.status === 404) return [];

  const courses: db_Grade[] = await res.json();

  return courses.map((course: db_Grade) => {
    return db_grade_to_front(course);
  });
};

interface db_Friend extends db_User {
  status: string;
}

export const getFriends = async (userId: number): Promise<DisplayFriend[]> => {
  const res = await fetch(`${endpoint}/api/user/${userId}/friends`);

  const friends: db_Friend[] = await res.json();

  return friends.map((friend: db_Friend) => {
    return {
      id: friend.id,
      name: friend.name,
      surname: friend.surname,
      status: friend.status as FriendStatus,
    };
  });
};

export const getSearchFriends = async (
  userId: number,
  query: string,
  id: number
) => {
  const res = await fetch(`${endpoint}/users/${userId}/${query}`);

  const friends = await res.json();

  return {
    res: friends.map((friend: db_Friend) => {
      return {
        id: friend.id,
        name: friend.name,
        surname: friend.surname,
        status: friend.status as FriendStatus,
      };
    }),
    id,
  };
};

export const addFriend = async (userId: number, friendId: number) => {
  const res = await fetch(`${endpoint}/api/user/${userId}/${friendId}`, {
    method: "POST",
    body: JSON.stringify({
      friendId,
    }),
  });

  console.log(await res.json());
};

export const removeFriend = async (userId: number, friendId: number) => {
  const res = await fetch(`${endpoint}/api/user/${userId}/${friendId}`, {
    method: "DELETE",
    body: JSON.stringify({
      friendId,
    }),
  });

  console.log(await res.json());
};

export const acceptFriend = async (userId: number, friendId: number) => {
  const res = await fetch(`${endpoint}/api/user/${userId}/${friendId}`, {
    method: "PUT",
    body: JSON.stringify({
      friendId,
    }),
  });

  console.log(await res.json());
};

export const addFavorite = async (userId: number, courseId: number) => {
  const res = await fetch(`${endpoint}/users/${userId}/favClasses/${courseId}`, {
    method: "POST",
    body: JSON.stringify({
      courseId,
    }),
  });

  console.log(await res.json());
};

export const removeFavorite = async (userId: number, courseId: number) => {
  const res = await fetch(`${endpoint}/users/${userId}/favClasses/${courseId}`, {
    method: "DELETE",
    body: JSON.stringify({
      courseId,
    }),
  });

  console.log(await res.json());
};

// ID for user: User Study
export const getUserId = async () => {
  return "user.study@uic.edu";
};
