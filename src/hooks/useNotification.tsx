import { useContext } from "react";
import { NotificationItem, NotificationType } from "../@types/NotificationTypes";
import { NotificationContext } from "../NotificationContext";

type NotifyProps = Pick<NotificationItem, "title" | "description" | "timeout">

export default function useNotification() {
    const { add, remove } = useContext(NotificationContext);

    const makeNotification = (type: NotificationType) => {
        return (props: NotifyProps) => add({ ...props, type })
    }

    return {
        add, remove,
        success: makeNotification("success"),
        info: makeNotification("info"),
        warning: makeNotification("warning"),
        danger: makeNotification("danger")
    };

}