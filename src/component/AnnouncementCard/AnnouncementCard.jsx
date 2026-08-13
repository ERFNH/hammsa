import React from "react";
import Button from "../Button/Button";
import Trash from "../../assets/icons/trash.svg?react";
import "./AnnouncementCard.css";

function AnnouncementCard({ item, onDelete, onRead }) {
  return (
    <div className={`announcement-card priority-${item.priority}`}>
      <div className="announcement-header">
        <Button className="trash-btn" onClick={() => onDelete(item.id)}>
          <Trash />
        </Button>
        <h3>{item.title}</h3>
      </div>
      <div className="announcement-body">
        <p>{item.description}</p>
      </div>
      <div className="announcement-footer">
        <label className="read-box">
          <input
            type="checkbox"
            checked={item.isRead}
            onChange={() => onRead(item.id)}
          />
          <span>خوانده شده</span>
        </label>
      </div>
    </div>
  );
}

export default AnnouncementCard;
