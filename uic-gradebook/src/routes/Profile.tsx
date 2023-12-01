import { Button, Image } from "@nextui-org/react";
import Box from "../components/Box";
import { Grade, User } from "../types/types";
import { FeedPersonIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";
import { getGrades } from "../api/server";
import UserGrades from "../components/UserGrades";

const ProfilePage = ({ user }: { user: User }) => {
  const [gpa, setGpa] = useState<number>(0); //gpa of the user
  const [grades, setGrades] = useState<Grade[]>([]);
  useEffect(() => {
    getGrades(user.id).then((grades) => {
      setGrades(grades);
      setGpa(calculateGPA(grades.map((grade) => grade.value))); //probably we have to do that in the backend
    });
  }, [user]);
  const calculateGPA = (grades: string[]): number => {
    const points = {
      A: 4,
      B: 3,
      C: 2,
      D: 1,
      F: 0,
    };

    const totalPoints = grades.reduce((sum, grade) => sum + points[grade], 0);
    return totalPoints / grades.length;
  };
  // handle Delete acc
  const handleDeleteAccount = async () => {
    // for future use
    alert("Account deleted.");
  };

  // handle change password
  const handleChangePassword = async () => {
    // for future use
    alert("Password changed.");
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    paddingTop: "100px",
    minHeight: "100vh", // to center vertically within the viewport
    width: "100vw", // to cover the entire width of the page
    backgroundColor: "white",
    margin: "0 auto",
  };

  const buttonStyle = {
    width: "200px", //width for the buttons
    backgroundColor: "#F8F8FF",
    color: "black",
    alignitems: "center",
  };

  return (
    <div style={containerStyle}>
      <div
        className="profile-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="profile-info">
          <Box style={{ alignItems: "center" }}>
            {user?.profilePic === undefined ? (
              <FeedPersonIcon size={150} />
            ) : (
              <Image
                src={user.profilePic}
                width={150}
                height={150}
                alt="Profile Picture"
              />
            )}

            <div
              style={{
                color: "black",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                paddingTop: "4%",
              }}
            >
              <h1>
                {user.name} {user.surname}
              </h1>
              <div
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "20px",
                }}
              >
                <p>{user!.email}</p>
                <p>GPA: {gpa.toFixed(2)}</p>
              </div>
            </div>
          </Box>
        </div>

        <div style={{ marginTop: "40px", marginBottom: "10px", width: "auto" }}>
          <UserGrades grades={grades} />
        </div>
        <div className="profile-button" style={{ paddingTop: "10%" }}>
          <div style={{ marginBottom: "10px", width: "100px" }}>
            <Button
              style={buttonStyle}
              onClick={async () => handleDeleteAccount()}
            >
              Delete Account
            </Button>
          </div>
          <div style={{ marginBottom: "10px", width: "auto" }}>
            <Button
              style={buttonStyle}
              onClick={async () => handleChangePassword()}
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
