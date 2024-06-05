import "../../components-css/jobscape/NotificationItem.css";
export default function NotificationItem({
  message,
  time,
  index,
  onDelete,
  notifId,
}) {
  const calculateTimePosted = (createdAt) => {
    const currentTime = new Date();
    const createdTime = new Date(createdAt);
    const diffInMs = currentTime - createdTime;
    const diffInSeconds = Math.floor(diffInMs / 1000); // Difference in seconds
    const diffInMinutes = Math.floor(diffInSeconds / 60); // Difference in minutes
    const diffInHours = Math.floor(diffInMinutes / 60); // Difference in hours

    if (diffInHours <= 1) {
      return "Less than an hour ago";
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24); // Difference in days
      return `${diffInDays} days ago`;
    }
  };
  return (
    <>
      <div className="notif-item-container">
        <div className="notif-texts">
          <p>{message}</p>
          <p className="time-text">{calculateTimePosted(time)}</p>
        </div>
        <i className="bi bi-x" onClick={() => onDelete(index, notifId)} />
      </div>
    </>
  );
}
