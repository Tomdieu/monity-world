import React from "react";

// TypeScript types for props
type Notification = {
  id: number;
  avatarColor: string; // Color for the avatar
  initials: string; // Initials in the avatar
  name: string; // Name of the user
  message: string; // Message to display
  project: string; // Project name
  time: string; // Time of notification
  isNew?: boolean; // If the notification is new
};

type NotificationGroup = {
  date: string; // Date for the group
  notifications: Notification[]; // Notifications for that date
};

type TaskNotificationProps = {
  title: string;
  groups: NotificationGroup[];
};

const TaskNotification: React.FC<TaskNotificationProps> = ({
  title,
  groups,
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>

      {/* Notification Groups */}
      {groups.map((group) => (
        <div key={group.date} className="mb-4">
          {/* Date */}
          <p className="text-sm font-medium text-gray-600 mb-2">{group.date}</p>

          {/* Notifications */}
          {group.notifications.map((notification) => (
            <div
              key={notification.id}
              className="grid grid-cols-12 gap-1 items-center justify-between py-2 w-full"
            >
              {/* Left Section */}
              <div className="flex col-span-10 items-center">
                {/* Avatar */}
                <div
                  className={`relative w-8 h-8 p-2 flex items-center justify-center rounded-full`}
                  style={{ backgroundColor: notification.avatarColor }}
                >
                  <span className="text-xs font-bold text-white">
                    {notification.initials}
                  </span>
                  {notification.isNew && (
                  <span className="absolute -top-1 -right-2 border-2 border-white w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                )}
                </div>

                {/* Text */}
                <div className="ml-3">
                  <p className="text-sm text-gray-800">
                    <span className="font-bold">{notification.name}</span> <span className="text-muted-foreground">{notification.message}</span>{" "}
                    <span className="font-bold">{notification.project}</span>
                  </p>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex col-span-2">

                {/* Time */}
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskNotification;
