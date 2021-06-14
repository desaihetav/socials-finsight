import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNotifications } from "./notificationsSlice";

export default function Notifications() {
  const { status, notifications } = useSelector((state) => state.notifications);
  const { status: authStatus, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    status === "idle" &&
      authStatus === "initComplete" &&
      dispatch(getNotifications(userId));
    // eslint-disable-next-line
  }, [authStatus]);

  const icon = {
    like: "heart-red",
    repost: "repost-green",
    save: "bookmark-yellow",
  };

  const content = {
    like: "liked",
    repost: "reposted",
    save: "saved",
  };

  return (
    <div className="mb-28">
      {notifications.map((notification) => (
        <div className="my-4 p-4 bg-gray-800 rounded-2xl flex">
          <img
            className="mr-4 h-7 w-7"
            src={`/icons/${icon[notification.type]}.svg`}
            alt="like"
          />
          <p className="text-gray-300">
            <Link
              className="font-bold text-gray-50"
              to={`/profile/${notification.sender.id}`}
            >
              {notification.sender.name}
            </Link>
            &nbsp;
            <span>{content[notification.type]}</span>
            &nbsp;your&nbsp;
            <Link className="font-bold text-gray-50" to={notification.link}>
              post
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
}
