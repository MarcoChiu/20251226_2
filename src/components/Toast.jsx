import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeMessage } from "../store/messageSlice";

export default function Toast() {
    const messages = useSelector((state) => state.message.messages);

    return (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 2000 }}>
            {messages.map((msg) => (
                <ToastItem key={msg.id} message={msg} />
            ))}
        </div>
    );
}

function ToastItem({ message }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(removeMessage(message.id));
        }, 3000);

        return () => clearTimeout(timer);
    }, [message.id, dispatch]);

    const handleDismiss = () => {
        dispatch(removeMessage(message.id));
    };

    return (
        <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className={`toast-header text-white bg-${message.type}`}>
                <strong className="me-auto">{message.title}</strong>
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleDismiss}
                ></button>
            </div>
            <div className="toast-body">{message.text}</div>
        </div>
    );
}
