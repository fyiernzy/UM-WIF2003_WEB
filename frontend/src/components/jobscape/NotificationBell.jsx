import NotificationMenu from "./NotificationMenu";
import { useEffect, useState } from "react";
import "../../components-css/NotificationBell.css";
import { socket } from "../../api/socketApi";
import { useUserContext } from "../../context/UserContext";
import {
  getNotifications,
  setReadNotification,
} from "../../api/notificationApi";

export default function NotificationBell(props) {
  const [bellFill, setBellFill] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const toggleNotif = () => {
    setIsNotifOpen(!isNotifOpen);
  };
  const handleMouseEnter = () => {
    setBellFill(true);
  };
  const handleMouseLeave = () => {
    setBellFill(false);
  };
  const onRemoveNotifItem = async (indexToRemove, notifId) => {
    setNotifications((prevNotifications) => {
      return prevNotifications.filter((_, index) => index !== indexToRemove);
    });
    await setReadNotification(notifId);
  };
  const { user } = useUserContext();
  const userId = user._id;
  const fetchNotifications = async () => {
    const notifArray = await getNotifications(userId);
    console.log("NotifArray: " + notifArray);
    setNotifications(notifArray);
  };
  useEffect(() => {
    // Sends out an event called register to socket in backend
    console.log("userid before sending to scoket:" + userId);
    socket.emit("register", userId);

    // Now the socket in this component is listening to sendNotif event
    socket.on("sendNotif", (notification) => {
      // notification is the notification schema object here
      console.log("notification received!: " + JSON.stringify(notification));
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });
    fetchNotifications();
    return () => {
      socket.off("sendNotif");
    };
  }, [userId]);
  return (
    <div className="notif-bell">
      <i
        className={`bi bell ${bellFill ? "bi-bell-fill" : "bi-bell"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={toggleNotif}
      />

      {notifications.length > 0 ? <i class="bi bi-circle-fill" /> : <></>}

      <NotificationMenu
        isOpen={isNotifOpen}
        notifs={notifications}
        onClose={() => setIsNotifOpen(false)}
        onRemoveNotifItem={onRemoveNotifItem}
      />
    </div>
  );
}
