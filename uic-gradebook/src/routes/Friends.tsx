import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import {
  XCircleIcon,
  PersonIcon,
  CheckCircleIcon,
} from "@primer/octicons-react";
import Box from "../components/Box";
import { Button, Card, CardBody } from "@nextui-org/react";
import { getFriends, getSearchFriends } from "../api/server";
import { DisplayFriend, User } from "../types/types";

// FriendActions component to handle the follow and pending actions
const FriendActions = ({
  friend,
  showFriends,
  onLinkReqClick,
}: {
  friend: DisplayFriend;
  showFriends: boolean;
  onLinkReqClick: (f: DisplayFriend, op: string) => void;
}) => {
  if (!showFriends) {
    if (!friend?.status) {
      return (
        <Button
          className="follow-button"
          disableRipple
          onClick={() => onLinkReqClick(friend, "follow")}
        >
          Follow
        </Button>
      );
    }
    return <></>;
  } else if (friend?.status === "pending") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <div onClick={() => onLinkReqClick(friend, "refuse")}>
          <XCircleIcon />
        </div>
        <div onClick={() => onLinkReqClick(friend, "accept")}>
          <CheckCircleIcon />
        </div>
      </div>
    );
  } else if (friend?.status === "accepted") {
    return (
      <Button
        className="follow-button"
        disableRipple
        onClick={() => onLinkReqClick(friend, "unlink")}
      >
        Unlink
      </Button>
    );
  }
  return <div>Pending</div>;
};

// FriendItem component to avoid repeating JSX
const FriendItem = ({
  friend,
  showFriends,
  onLinkReqClick,
}: {
  friend: DisplayFriend;
  showFriends: boolean;
  onLinkReqClick: (f: DisplayFriend, op: string) => void;
}) => {
  return (
    <div key={friend.id}>
      <Card
        shadow="lg"
        style={{
          marginTop: "2%",
          marginBottom: "2%",
          minHeight: "8vh",
          display: "flex",
          justifyContent: "center",
        }}
        fullWidth
      >
        <CardBody style={{ justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "70%" }}
            >
              <PersonIcon size={24} />
              <p
                style={{ marginLeft: "2%" }}
              >{`${friend.name} ${friend.surname}`}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "30%",
                justifyContent: "center",
              }}
            >
              <FriendActions
                friend={friend}
                showFriends={showFriends}
                onLinkReqClick={onLinkReqClick}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

function Friends() {
  const [searchString, setSearchString] = useState("");
  const [showFriends, setShow] = useState(true);
  const [friends, setFriends] = useState<DisplayFriend[]>([]);
  const [searchRes, setSearchRes] = useState<User[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const friendsData = await getFriends(1);
      setFriends(friendsData);
    };
    fetchFriends();
  }, []);

  useEffect(() => {
    if (friends.length === 0) setShow(false);
    else setShow(true);
  }, [friends]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchString === "") {
        setShow(true);
      } else {
        setShow(false);
        const searchResults = await getSearchFriends(searchString, 0);
        const filteredResults = searchResults.res.filter(
          (user) => !friends.find((friend) => friend.id === user.id)
        );
        setSearchRes(filteredResults);
      }
    };
    fetchSearchResults();
  }, [searchString]);

  // follow, accept, refuse, unlink
  const onLinkReqClick = (friend: DisplayFriend, op: string) => {
    console.log(friend, op);

    if (op == "accept") {
      setFriends((prev) =>
        prev.map((f) => (f.id === friend.id ? { ...f, status: "accepted" } : f))
      );
    } else if (op == "refuse") {
      setFriends((prev) =>
        prev.filter((f) => (f.id !== friend.id))
      );
    } else if (op == "follow") {
      setFriends((prev) => [...prev, { ...friend, status: "pending" }]);
    } else if (op == "unlink") {
      setFriends((prev) => prev.filter((f) => f.id !== friend.id));
    }
  };
  // Function to handle friend request acceptance or denial
  // Uncomment and complete this function as needed
  // const onLinkReqClick = (friendId, isAccept) => {
  //   // Implement friend request logic here
  // };

  return (
    <Box>
      <div style={{ marginTop: "4%", width: "100%" }}>
        <SearchBar
          searchString={searchString}
          setSearchString={setSearchString}
        />
      </div>
      <Box>
        <div style={{ width: "100%" }}>
          {showFriends && searchString === "" ? (
            <>
              <div style={{ marginTop: "4%", marginBottom: "4%" }}></div>
              <p style={{ textAlign: "center" }}>Friends and Requests</p>
              <hr />
              {friends?.map((friend) => (
                <FriendItem
                  key={friend.id}
                  friend={friend}
                  showFriends={showFriends}
                  onLinkReqClick={onLinkReqClick}
                />
              ))}
            </>
          ) : (
            <div>
              {searchRes?.map((user) => (
                <FriendItem
                  key={user.id}
                  friend={user as DisplayFriend}
                  showFriends={showFriends}
                  onLinkReqClick={onLinkReqClick}
                />
              ))}
            </div>
          )}
        </div>
      </Box>
    </Box>
  );
}

export default Friends;
