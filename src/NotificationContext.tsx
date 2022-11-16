import { createContext, ReactNode, useState } from "react";
import { NotificationItem } from "./@types/NotificationTypes";
import Notification from "./components/Notification";

type AddNotificationProps = Omit<NotificationItem, "id">

interface NotificationContextProps {
    add: (notification: AddNotificationProps) => string;
    remove: (id: string) => void
}

export const NotificationContext = createContext<NotificationContextProps>({
    add: (_notification: AddNotificationProps) => "",
    remove: (_id: string) => { }
});


interface NotificationProviderProps {
    children: ReactNode
}

const makeHash = () => Math.random().toString(36).slice(2, 10);

export function NotificationProvider({ children }: NotificationProviderProps) {
    const [notifications, setNotifications] = useState<NotificationItem[]>([])

    const addNotification = (notification: AddNotificationProps) => {
        const id = makeHash();
        setNotifications((notifications) => [{ id, ...notification }, ...notifications])
        return id;
    }
    const removeNotification = (id: string) => {
        setNotifications(notifications => notifications.filter(item => item.id != id))
    }

    const value = {
        add: addNotification,
        remove: removeNotification
    }
    return (
        <NotificationContext.Provider value={value}>
            {children}
            <div className="p-3">
                {notifications.map(notification => <Notification key={notification.id} onClose={() => removeNotification(notification.id)} {...notification} />)}
            </div>
        </NotificationContext.Provider>
    )
}