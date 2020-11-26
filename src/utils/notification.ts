export const requestNotificationPermission = () => {
  if ('Notification' in window) {
    Notification.requestPermission();
  }
};

export const showNotification = (title: string) => new Notification(title);
