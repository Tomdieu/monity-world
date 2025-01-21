import Image from "next/image";
import React from "react";

type Alert = {
  id: number;
  avatar: string; // URL of the avatar image
  title: string; // Alert title (e.g., Marketing)
  description: string; // Alert description
  time: string; // Time string (e.g., 10:02 am)
};

type AlertsPanelProps = {
  alerts: Alert[]; // Array of alerts to display
  unreadCount: number; // Number of unread alerts
  onLoadMore: () => void; // Callback to load more alerts
};

const AlertsPanel: React.FC<AlertsPanelProps> = ({
  alerts,
  unreadCount,
  onLoadMore,
}) => {
  return (
    <div className="w-full max-w-md bg-white rounded-md shadow-md p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Alerts Panel</h2>
        <span className="text-blue-500 text-sm font-medium">
          ({unreadCount} unread)
        </span>
      </div>

      {/* Alerts List */}
      <div>
        <h3 className="text-sm text-gray-600 font-semibold mb-2">Today</h3>
        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li key={alert.id} className="flex items-center">
              {/* Avatar */}
              <Image
                src={alert.avatar}
                alt={alert.title}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />

              {/* Alert Details */}
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {alert.title}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {alert.description}
                </p>
              </div>

              {/* Time */}
              <span className="text-xs text-gray-400">{alert.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Load More Button */}
      <div className="text-center mt-4">
        <button
          onClick={onLoadMore}
          className="text-sm text-gray-500 hover:text-blue-500"
        >
          load more..
        </button>
      </div>
    </div>
  );
};

export default AlertsPanel;
