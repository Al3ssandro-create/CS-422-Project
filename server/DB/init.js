const {
  populate_user,
  populate_courses,
  populate_friends,
  populate_fav_courses,
  get_fav_courses,
  get_friends,
  drop_friends,
  get_courses_by_name
} = require("./db");

const init = async () => {
  populate_user();

  populate_courses();

  // "pending" | "accepted"
  await populate_friends([
    ["user.study@uic.edu", "mario.rossi@uic.edu", "accepted"],
    ["marco.santa@polimi.it", "user.study@uic.edu", "accepted"],
    ["user.study@uic.edu", "ethan.davis@example.com", "requested"],
    ["david.miller@example.com", "user.study@uic.edu", "requested"],
    ["user.study@uic.edu", "charlie.brown@example.com", "accepted"],
    ["bob.smith@example.com", "user.study@uic.edu", "requested"],
    ["user.study@uic.edu", "alice.johnson@example.com", "requested"],
  ]);

  await populate_fav_courses("user.study@uic.edu", [
    {
      deparment: "CS",
      number: "422",
      semester: "fall",
      year: 2022,
    },
    {
      deparment: "CS",
      number: "361",
      semester: "spring",
      year: 2023,
    },
    {
      deparment: "CS",
      number: "261",
      semester: "fall",
      year: 2021,
    },
    {
      deparment: "CS",
      number: "401",
      semester: "fall",
      year: 2022,
    },
    {
      deparment: "MATH",
      number: "313",
      semester: "fall",
      year: 2022,
    },
  ]);
};

// init();

const test = async () => {
  console.log(await get_fav_courses(3));

  console.log(await get_friends(3));
};

// test();

const get_by_name = async (userId, course) => {
    const data = await get_courses_by_name(userId, course)

    console.log(data)
}

get_by_name(3, {
    department: "CS",
    number: "422"
});
