import { Class, User, FriendStatus, DisplayFriend, Grade } from "../types/types";

import { db_Class, db_Class_search, db_Grade, db_User, db_User_grade } from "../types/backend";

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
    grade: "",
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
    grade: grade.userGrade,
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

function db_user_grades_to_front(grade: db_User_grade ): Grade {
  return {
    user: grade.user,
    value: grade.grade,
    semester: grade.semester,
    year: grade.year,
    department: grade.department,
    number: grade.number,
    name: grade.name,
    instructor: grade.instructor,
  };
}


export const getGrades = async (userId: number): Promise<Grade[]> => {
  const res = await fetch(`${endpoint}/api/user/${userId}/grades`);
  if (res.status === 404) return [];
  const grades: db_User_grade[] = await res.json();
  console.log(grades)
  return grades.map((grade: db_User_grade) => {
    return db_user_grades_to_front(grade);
  });
};

export const addGrade = async (userId: number, courseId: number, grade: string) => {
  await fetch(`${endpoint}/api/user/${userId}/grades/${courseId}/${grade}`,
    {
      method: "POST",
      body: JSON.stringify({
        "courseId": courseId,
        "grade": grade,
      }),
    }
  );
}
export const modifyGrade = async (userId: number, courseId: number, grade: string) => {
  await fetch(`${endpoint}/api/user/${userId}/grades/${courseId}/${grade}`,
    {
      method: "PUT",
      body: JSON.stringify({
        "courseId": courseId,
        "grade": grade,
      }),
    }
  );
}
export const removeGrade = async (userId: number, courseId: number) => {
  await fetch(`${endpoint}/api/user/${userId}/grades/${courseId}`,
    {
      method: "DELETE",
      body: JSON.stringify({
        "courseId": courseId,
      }),
    }
  );

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
): Promise<{ res: db_Class_search[]; id: number }> => {
  const target = query.toLowerCase();

  const res = await fetch(`${endpoint}/api/courses/${department}/${target}`);

  const courses: db_Class_search[] = await res.json();

  return {
    res: courses,
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
  const courses : db_Grade[] = await res.json();
  console.log(courses)
  return courses.map((course: db_Grade) => {
    return db_grade_to_front(course);
  });
};

interface db_Friend extends db_User {
  f: string;
  status: string;
}

export const getFriends = async (userId: number): Promise<DisplayFriend[]> => {
  const res = await fetch(`${endpoint}/api/user/${userId}/friends`);

  const friends: db_Friend[] = await res.json();

  return friends.map((friend: db_Friend) => {
    let status = "pending";

    if (friend.status === "accepted") {
      status = "accepted";
    } else if (friend.status === "requested" && friend.f === "from") {
      status = "requested";
    }

    return {
      id: friend.id,
      name: friend.name,
      surname: friend.surname,
      status: status as FriendStatus,
    };
  });
};

export const getSearchFriends = async (
  userId: number,
  query: string,
  id: number
) => {
  const res = await fetch(`${endpoint}/api/query/${userId}/${query}`);

  const friends = await res.json();

  return {
    res: friends.map((friend: db_Friend) => {
      let status = "none";

      if (friend.status === "accepted") {
        status = "accepted";
      } else if (friend.status === "requested" && friend.f === "from") {
        status = "requested";
      } else if (friend.status === "requested" && friend.f === "to") {
        status = "pending";
      }

      return {
        id: friend.id,
        name: friend.name,
        surname: friend.surname,
        status: status as FriendStatus,
      };
    }),
    id,
  };
};

export const addFriend = async (userId: number, friendId: number): Promise<boolean> => {
  const res = await fetch(`${endpoint}/api/user/${userId}/friends/${friendId}`, {
    method: "POST",
    body: JSON.stringify({
      "friendId": friendId,
    }),
  });

  if (res.status === 200)
    return true;

  return false;
};

export const removeFriend = async (userId: number, friendId: number): Promise<boolean> => {
  const res = await fetch(`${endpoint}/api/user/${userId}/friends/${friendId}`, {
    method: "DELETE"
  });

  if (res.status === 200)
    return true;

  return false;
};

export const acceptFriend = async (userId: number, friendId: number): Promise<boolean> => {
  const res = await fetch(`${endpoint}/api/user/${userId}/friends/${friendId}`, {
    method: "PUT",
    body: JSON.stringify({
      friendId,
    }),
  });

  if (res.status === 200)
    return true;

  return false;
};

export const addFavorite = async (userId: number, courseId: number): Promise<boolean> => {
  const res = await fetch(
    
    `${endpoint}/api/user/${userId}/fav_courses/${courseId}`,
    {
      method: "POST"
    }
  );

  if (res.status === 200)
    return true;

  return false;
};

export const removeFavorite = async (userId: number, courseId: number): Promise<boolean> => {
  const res = await fetch(
    `${endpoint}/api/user/${userId}/fav_courses/${courseId}`,
    {
      method: "DELETE"
    }
  );

  if (res.status === 200)
    return true;

  return false;
};

// ID for user: User Study
export const getUserId = async () => {
  return "user.study@uic.edu";
};
