import { createSlice } from "@reduxjs/toolkit";

/**
 * 每個訊息的格式:
 * {
 *   id: timestamp,
 *   title: string, ('成功', '失敗', etc.)
 *   text: string, ('已更新產品', etc.)
 *   status: string, ('success', 'danger', etc.)
 * }
 */

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
    },
    reducers: {
        createMessage(state, action) {
            const { success, type, title, message } = action.payload;
            if (success) {
                state.messages.push({
                    id: Date.now(),
                    type: type || "success",
                    title: title || "成功",
                    text: message,
                });
            } else {
                state.messages.push({
                    id: Date.now(),
                    type: type || "danger",
                    title: title || "失敗",
                    text: Array.isArray(message)
                        ? message.join("、")
                        : message,
                });
            }
        },
        removeMessage(state, action) {
            const messageId = action.payload;
            state.messages = state.messages.filter((msg) => msg.id !== messageId);
        },
    },
});

export const { createMessage, removeMessage } = messageSlice.actions;

export default messageSlice.reducer;
