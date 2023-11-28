const {
  populate_user,
  populate_courses,
  populate_friends,
  populate_fav_courses,
  get_fav_courses,
  get_friends,
  drop_friends,
  get_courses_by_name,
  get_department_distinct,
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

const dept = async () => {
  const data = await get_department_distinct();

  console.log(data.length);

  const dept = data.map((d) => {
    return `\"${d.department}\"`;
  });

  console.log(dept.join(", "));
};

const arr = ["AAST", "ACTG", "AD", "AH", "AHS", "ANAT", "ANTH", "ARAB", "ARCH", "ARST", "ART", "ASAM", "ASP", "ASST", "BA", "BCHE", "BCMG", "BHIS", "BIOE", "BIOS", "BLST", "BME", "BMS", "BPS", "BSTT", "BVIS", "CC", "CD", "CEES", "CELE", "CEMM", "CHE", "CHEM", "CHIN", "CHSC", "CI", "CIC", "CIE", "CL", "CLER", "CLJ", "CME", "COMM", "CRJ", "CS", "CST", "DADM", "DAOB", "DBCS", "DBSC", "DCLE", "DES", "DHD", "DIS", "DLG", "DOSI", "DOST", "EAES", "EB", "ECE", "ECON", "ED", "EDPS", "ELSI", "ENDO", "ENER", "ENGL", "ENGR", "ENTR", "EOHS", "EPID", "EPSY", "ESL", "FIN", "FR", "GAMD", "GC", "GCLS", "GEMS", "GENE", "GEOG", "GER", "GKA", "GKM", "GLAS", "GWS", "HEB", "HIM", "HIST", "HLP", "HN", "HNUR", "HON", "HPA", "HSTL", "HUM", "IDEA", "IDS", "IE", "INST", "IP", "IPHS", "ISA", "IT", "ITAL", "JD", "JPN", "JST", "KN", "KOR", "LALS", "LAS", "LAT", "LAW", "LCSL", "LIB", "LING", "LITH", "LRSC", "MATH", "MBA", "MBT", "MCS", "MDC", "MDCH", "MDP", "MDR", "ME", "MENG", "MGMT", "MHPE", "MILS", "MIM", "MKTG", "MLS", "MOVI", "MTHT", "MUS", "MUSE", "MVSC", "NAST", "NATS", "NEUS", "NS", "NUAS", "NUEL", "NUMC", "NUMS", "NUPH", "NUPR", "NUPS", "NURS", "NUSC", "NUSP", "OMDS", "ORLA", "ORTD", "OSCI", "OSUR", "OT", "PA", "PATH", "PCOL", "PEDD", "PELE", "PERI", "PHAR", "PHIL", "PHYB", "PHYS", "PMAD", "PMMP", "PMPG", "PMPR", "POL", "POLS", "PORT", "PPOL", "PRCL", "PROS", "PS", "PSCH", "PSCI", "PSL", "PSOP", "PT", "PTL", "PUBH", "RE", "RELE", "RELS", "RES", "REST", "RUSS", "SJ", "SLAV", "SOC", "SOCW", "SPAN", "SPEC", "SPED", "STAT", "TADR", "THTR", "TX", "UELE", "UPA", "UPP", "US"]

console.log(arr.length);

// dept();
