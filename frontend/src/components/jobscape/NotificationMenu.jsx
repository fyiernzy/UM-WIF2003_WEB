import "../../components-css/jobscape/NotificationMenu.css";
import { useState } from "react";
import { Button, Pagination } from "react-bootstrap";
import NotificationItem from "./NotificationItem";

export default function NotificationMenu({
  isOpen,
  notifs,
  onClose,
  onRemoveNotifItem,
}) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(notifs.length / pageSize);
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div className="notification-menu">
      <div className="notification-header">
        <h5>Notifications</h5>
        <i className="bi bi-x close-notif-btn" onClick={onClose} />
      </div>
      <div className="notification-list">
        {notifs
          .slice((page - 1) * pageSize, page * pageSize)
          .map((notif, index) => (
            <NotificationItem
              className="notification-item"
              key={index}
              message={notif.message}
              time={notif.createdAt}
              index={index}
              notifId={notif._id}
              onDelete={onRemoveNotifItem}
            />
          ))}
      </div>
      <div className="notification-pagination">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === page}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
}
