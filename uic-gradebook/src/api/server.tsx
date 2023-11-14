import {
  Class,
  User,
  Friend,
  FriendStatus,
  DisplayFriend,
  DisplayClass,
} from "../types/types";
import _users from "./users.json";
import _classes from "./classes.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformAndValidateUsers(rawData: any[]): User[] {
  return rawData.map((user) => {
    // Validate and transform friends
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const friends: Friend[] = user.friends.map((friend: any) => {
      // Check if status is either "pending" or "accepted"
      if (friend.status !== "pending" && friend.status !== "accepted") {
        throw new Error(`Invalid friend status: ${friend.status}`);
      }
      return { id: friend.id, status: friend.status as FriendStatus };
    });

    // Return a new User object
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      gpa: user.gpa,
      favClasses: user.favClasses,
      friends: friends,
    };
  });
}

const getUsers = async (): Promise<User[]> => {
  const user = localStorage.getItem("users");

  if (user === null) {
    localStorage.setItem("users", JSON.stringify(_users));

    return transformAndValidateUsers(_users);
  }

  return JSON.parse(user);
};

const getClasses = async (): Promise<Class[]> => {
  const classes = localStorage.getItem("classes");

  if (classes === null) {
    localStorage.setItem("classes", JSON.stringify(_classes));
    return _classes;
  }

  return JSON.parse(classes);
};

export const getUser = async (userId: number): Promise<User | undefined> => {
  const users = await getUsers();

  return users.find((user) => user.id === userId);
};

export const getFavCourses = async (userId: number) => {
  const user = await getUser(userId);

  if (user === undefined) return [];

  const classes = await getClasses();

  return classes.filter((course) => user.favClasses.includes(course.id));
};

export const getSearchCourses = async (
  query: string,
  id: number
): Promise<{ res: DisplayClass[]; id: number }> => {
  const target = query.toLowerCase();

  const classes = await getClasses();

  const uniqueCourses = new Set();

  const distinctClasses = classes.filter((course) => {
    const courseNameMatches = course.name.toLowerCase().includes(target);
    const teacherNameMatches = course.teacher.toLowerCase().includes(target);
    const serializedCourse = `${course.name}${course.teacher}`

    if (
      (courseNameMatches || teacherNameMatches) &&
      !uniqueCourses.has(serializedCourse)
    ) {
      uniqueCourses.add(serializedCourse);
      return true;
    }

    return false;
  });

  return {
    res: distinctClasses,
    id,
  };
};

function parseSemester(semester: string) {
  type SemesterOrder = {
    [key: string]: number;
    Spring: number;
    Summer: number;
    Fall: number;
  };

  const order: SemesterOrder = { Spring: 1, Summer: 2, Fall: 3 };
  const parts = semester.split(" ");
  return {
    year: parseInt(parts[1], 10),
    term: order[parts[0]],
  };
}

export const getCoursesByName = async (name: string): Promise<Class[]> => {
  const classes = await getClasses();

  return classes
    .filter((course) => course.name === name)
    .sort((a, b) => {
      const semesterA = parseSemester(a.semester);
      const semesterB = parseSemester(b.semester);

      if (semesterA.year !== semesterB.year) {
        return semesterB.year - semesterA.year;
      } else {
        return semesterA.term - semesterB.term;
      }
    });
};

export const getFriends = async (userId: number): Promise<DisplayFriend[]> => {
  const user = await getUser(userId);

  if (user === undefined) return [];

  const users = await getUsers();

  const friends_id = user.friends.map((friend) => friend.id);

  const friends = users.filter((friend) => friends_id.includes(friend.id));

  return friends.map((friend) => {
    // The optional chaining operator (?.) ensures that we don't try to call find on undefined or null
    let status = user.friends?.find((f) => f.id === friend.id)?.status;

    // Using a default value of "pending" if status is undefined
    status = status ?? "pending";

    return {
      ...friend,
      status,
    };
  });
};

export const getSearchFriends = async (
  query: string,
  id: number
): Promise<{ res: User[]; id: number }> => {
  const target = query.toLowerCase();

  const users = await getUsers();

  return {
    res: users.filter((user) =>
      (user.name + user.surname).toLowerCase().includes(target)
    ),
    id,
  };
};

export const addFriend = async (userId: number, friendId: number) => {
  const users = await getUsers();

  const updatedUsers = users.map((u) => {
    if (u.id === userId) {
      // Clone the user and update the friends array
      return {
        ...u,
        friends: [...u.friends, { id: friendId, status: "requested" }],
      };
    } else if (u.id === friendId) {
      // Clone the friend and update the friends array
      return {
        ...u,
        friends: [...u.friends, { id: userId, status: "pending" }],
      };
    }
    return u; // Return the unchanged user
  });

  // Save the updated users array to localStorage
  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

export const removeFriend = async (userId: number, friendId: number) => {
  const users = await getUsers();

  const updatedUsers = users.map((u) => {
    if (u.id === userId) {
      // Clone the user and update the friends array
      return {
        ...u,
        friends: u.friends.filter((f) => f.id !== friendId),
      };
    } else if (u.id === friendId) {
      // Clone the friend and update the friends array
      return {
        ...u,
        friends: u.friends.filter((f) => f.id !== userId),
      };
    }
    return u; // Return the unchanged user
  });

  // Save the updated users array to localStorage
  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

export const acceptFriend = async (userId: number, friendId: number) => {
  const users = await getUsers();

  const updatedUsers = users.map((u) => {
    if (u.id === userId) {
      // Clone the user and update the friends array
      return {
        ...u,
        friends: u.friends.map((f) => {
          if (f.id === friendId) {
            return { ...f, status: "accepted" };
          }
          return f;
        }),
      };
    } else if (u.id === friendId) {
      // Clone the friend and update the friends array
      return {
        ...u,
        friends: u.friends.map((f) => {
          if (f.id === userId) {
            return { ...f, status: "accepted" };
          }
          return f;
        }),
      };
    }
    return u; // Return the unchanged user
  });

  // Save the updated users array to localStorage
  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

export const addFavorite = async (userId: number, courseId: number) => {
  const users = await getUsers();

  const updatedUsers = users.map((u) =>
    u.id === userId ? { ...u, favClasses: [...u.favClasses, courseId] } : u
  );

  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

export const removeFavorite = async (userId: number, courseId: number) => {
  const users = await getUsers();

  const updatedUsers = users.map((u) =>
    u.id === userId
      ? { ...u, favClasses: u.favClasses.filter((c) => c !== courseId) }
      : u
  );

  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

export const getUserId = async () => {
  return 1
};