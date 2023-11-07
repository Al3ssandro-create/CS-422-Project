import React, { useEffect } from "react";
import { Button, Image } from "@nextui-org/react";
import Box from "../components/Box";
import { User } from "../types/types";
import { getUser } from "../api/server";
import { FeedPersonIcon } from "@primer/octicons-react";

const ProfilePage = () => {
  const [user, setUser] = React.useState<User>({
    id: 1,
    name: "",
    surname: "",
    email: "",
    gpa: 0,
  } as User);

  useEffect(() => {
    getUser(1).then((user) => {if (user) setUser(user)});
  }, []);

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
    height: "100vw", // to center vertically within the viewport
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
              <h1>{user!.name}</h1>
              <div
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "20px",
                }}
              >
                <p>GPA: {user!.gpa}</p>
              </div>
            </div>
          </Box>
        </div>

        <div
          style={{
            marginTop: "200px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="profile-button">
            <div style={{ marginBottom: "10px", width: "100px" }}>
              <Button style={buttonStyle} onClick={async () => handleDeleteAccount()}>
                Delete Account
              </Button>
            </div>
            <div style={{ marginBottom: "10px", width: "auto" }}>
              <Button style={buttonStyle} onClick={async () => handleChangePassword()}>
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
