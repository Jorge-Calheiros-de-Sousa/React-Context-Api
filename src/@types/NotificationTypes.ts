

export type NotificationType = "info" | "warning" | "danger" | "success";


export type NotificationItem = {
    id: string
    title: string
    description: string
    type: NotificationType
    timeout?: number
}