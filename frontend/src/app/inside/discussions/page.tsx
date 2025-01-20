"use client";

import React, { useEffect, useRef, useState } from "react";
import { connectToChat, getChatHistory } from "@/src/lib/api";

interface ChatMessage {
    user: string;
    message: string;
}

const Chat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Fetch chat history on mount
        getChatHistory()
            .then((history) => setMessages(history))
            .catch((err) => console.error("Error fetching chat history:", err));

        // Initialize WebSocket connection
        const socket = connectToChat();
        socketRef.current = socket;

        socket.onmessage = (event) => {
            try {
                const newMessage: ChatMessage = JSON.parse(event.data);
                setMessages((prev) => [...prev, newMessage]);
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        socket.onopen = () => {
            console.log("WebSocket connection established.");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.warn("WebSocket connection closed.");
        };

        // Cleanup on unmount
        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = () => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            const newMessage: ChatMessage = { user: "You", message: input };
            socketRef.current.send(JSON.stringify(newMessage));
            setInput(""); // Clear input field
        } else {
            console.error("WebSocket not open. Current state:", socketRef.current?.readyState);
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.user}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="input"
                />
                <button onClick={sendMessage} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
