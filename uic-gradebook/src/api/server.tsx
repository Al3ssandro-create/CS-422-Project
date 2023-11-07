import {
  Class,
  User,
  Friend,
  FriendStatus,
  DisplayFriend,
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
): Promise<{ res: Class[]; id: number }> => {
  const target = query.toLowerCase();

  const classes = await getClasses();

  return {
    res: classes.filter(
      (course) =>
        course.name.toLowerCase().includes(target) ||
        course.teacher.toLowerCase().includes(target)
    ),
    id,
  };
};

export const getFriends = async (userId: number): Promise<DisplayFriend[]> => {
  const user = await getUser(userId);

  if (user === undefined) return [];

  const users = await getUsers();

  const friends_id = user.friends.map((friend) => friend.id);

  const friends = users.filter((friend) => friends_id.includes(friend.id));

  return friends.map((friend) => {
    let status = user.friends.find((f) => f.id === friend.id)?.status;

    if (status === undefined) status = "pending"
    
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

  const user = users.find((user) => user.id === userId);
  const friend = users.find((user) => user.id === friendId);

  if (user === undefined || friend === undefined) return;

  user.friends.push({ id: friendId, status: "pending" });
  friend.friends.push({ id: userId, status: "pending" });

  localStorage.setItem("users", JSON.stringify({...users, user, friend}));
};