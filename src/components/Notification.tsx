import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { NotificationType } from "../@types/NotificationTypes";
import { AiFillCloseCircle } from "react-icons/ai"

type Props = {
    title: string
    description?: string
    type: NotificationType
    timeout?: number;
    onClose?: VoidFunction
}


export default function Notification({ title, description, type, timeout, onClose }: Props) {

    useEffect(() => {
        if (timeout) {
            const timeouId = setTimeout(handleClose, timeout);
            return () => clearTimeout(timeouId)
        }
    }, [])

    const handleClose = () => {
        onClose?.();
    }

    const variantByAttribute = `${type}`;
    return (
        <Alert variant={variantByAttribute}>
            <div className="d-flex justify-content-between align-items-center text-center pb-3">
                <strong className="my-20">{title}</strong>
                <AiFillCloseCircle onClick={handleClose} size={25} style={{
                    cursor: "pointer"
                }} />
            </div>
            {description}
        </Alert>
    )
}