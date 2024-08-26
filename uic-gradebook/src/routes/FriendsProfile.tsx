import { Button, Image } from "@nextui-org/react";
import { DisplayFriend, Grade, User } from "../types/types";
import {
  CheckCircleIcon,
  FeedPersonIcon,
  XCircleIcon,
} from "@primer/octicons-react";
import { useEffect, useState } from "react";
import {
  acceptFriend,
  addFriend,
  getGrades,
  getSearchFriends,
  removeFriend,
} from "../api/server";
import UserGrades from "../components/UserGrades";
import { useParams } from "react-router-dom";
//123
const FriendsProfile = ({ user }: { user: User }) => {
  const [profileName, setProfileName] = useState<string>("");
  const [profileSurname, setProfileSurname] = useState<string>("");
  const [profileStatus, setProfileStatus] = useState<string>("");
  const [searchFriend, setSearchFriend] = useState<DisplayFriend[]>([]); //searched friends
  const [showFriends, setShow] = useState(false);
  const [fakeFriend, setFakeFriend] = useState<DisplayFriend>(
    {} as DisplayFriend
  ); //fake friend to handle the follow and pending actions
  const [grades, setGrades] = useState<Grade[]>([]);
  const { name, surname, id } = useParams();
  const stringName = name?.toString() ?? "";
  const userId = parseInt(id?.toString() ?? "-1");

  useEffect(() => {
    getGrades(userId).then((grades) => {
      setGrades(grades);
    });
    getSearchFriends(user.id, stringName, userId).then((res) => {
      setSearchFriend(res.res);
    });
  }, [user, userId]);

  useEffect(() => {
    if (searchFriend.length > 0) {
      setFakeFriend(searchFriend[0]);
    }
  }, [searchFriend]);
  useEffect(() => {
    setProfileName(fakeFriend.name);
    setProfileSurname(fakeFriend.surname);
    setProfileStatus(fakeFriend.status);
    if (fakeFriend.status === "none" || fakeFriend.status === "pending") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [fakeFriend]);
  useEffect(() => {}, [profileStatus]);

  const containerStyle = {
    display: "flex",
    justifyContent: "start",
    padding: "5%",
    height: "100vw", // to center vertically within the viewport
    width: "100vw", // to cover the entire width of the page
    backgroundColor: "white",
    flexDirection: "column",
  };
  const onLinkReqClick = (friend: DisplayFriend, op: string) => {
    if (op == "accept") {
      acceptFriend(user.id, friend.id).then(() => {
        setProfileStatus("accepted");
      });
    } else if (op == "refuse") {
      removeFriend(user.id, friend.id).then(() => {
        setProfileStatus("none");
      });
    } else if (op == "follow") {
      addFriend(user.id, friend.id).then(() => {
        setProfileStatus("pending");
      });
    } else if (op == "unlink") {
      removeFriend(user.id, friend.id).then(() => {
        setProfileStatus("none");
      });
    }

    fetchFriends();
  };
  const fetchFriends = async () => {
    const friendsData = await getSearchFriends(user.id, stringName, userId);
    setSearchFriend(friendsData.res);
  };
  return (
    <div style={containerStyle}>
      <div
        className="profile-container"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        {user?.profilePic === undefined ? (
          <FeedPersonIcon size={120} />
        ) : (
          <Image
            src={user.profilePic}
            width={120}
            height={120}
            alt="Profile Picture"
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            marginLeft: "5%",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            {profileName} {profileSurname}
          </span>
          <span>
            <FriendActions
              friend={fakeFriend}
              showFriends={showFriends}
              onLinkReqClick={onLinkReqClick}
              friendStatus={profileStatus}
            />
          </span>
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        {showFriends && <UserGrades grades={grades} />}
      </div>
    </div>
  );
};

const FriendActions = ({
  friend,
  showFriends,
  onLinkReqClick,
  friendStatus,
}: {
  friend: DisplayFriend;
  showFriends: boolean;
  onLinkReqClick: (f: DisplayFriend, op: string) => void;
  friendStatus: string;
}) => {
  const [displayFriend, setDisplayFriend] = useState<DisplayFriend>(friend);
  useEffect(() => {
    setDisplayFriend(friend);
  }, [friend]);
  const updateDisplayFriend = (action: string) => {
    onLinkReqClick(friend, action);

    if (action === "follow") {
      setDisplayFriend({ ...displayFriend, status: "pending" });
    } else if (action === "unlink") {
      setDisplayFriend({ ...displayFriend, status: "none" });
    } else if (action === "accept") {
      setDisplayFriend({ ...displayFriend, status: "accepted" });
    } else if (action === "refuse") {
      setDisplayFriend({ ...displayFriend, status: "none" });
    }
  };

  if (friendStatus === "none") {
    return (
      <Button
        className="follow-button"
        disableRipple
        onClick={() => updateDisplayFriend("follow")}
      >
        Follow
      </Button>
    );
  } else if (friendStatus === "requested") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <div onClick={() => updateDisplayFriend("refuse")}>
          <div style={{ color: "red" }}>
            <XCircleIcon size={24} />
          </div>
        </div>
        <div onClick={() => updateDisplayFriend("accept")}>
          <div style={{ color: "green" }}>
            <CheckCircleIcon size={24} />
          </div>
        </div>
      </div>
    );
  } else if (friendStatus === "accepted") {
    return (
      <Button
        className="follow-button"
        disableRipple
        onClick={() => updateDisplayFriend("unlink")}
      >
        Unlink
      </Button>
    );
  }
  return (
    <Button
      className="follow-button"
      disableRipple
      onClick={() => updateDisplayFriend("refuse")}
    >
      Pending
    </Button>
  );
};
export default FriendsProfile;
