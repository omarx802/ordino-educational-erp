"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import { Send } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/src/components/ui/card";
import { sendMessage } from "@/src/lib/api";

export default function AskAI() {
  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
  ]);
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;

  const handleSendMessage = async (userMessage: string) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    try {
      const response = await sendMessage(userMessage);
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: response.response,
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: "Sorry, something went wrong.",
        },
      ]);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>GQ</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Groq AI</p>
              <p className="text-sm text-muted-foreground">groq@groq.com</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex max-w-[75%] flex-col gap-3 rounded-lg px-6 justify-center py-2 text-sm whitespace-pre-wrap break-words",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="fixed bottom-0 left-0 w-full bg-transparent shadow-md p-4">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              handleSendMessage(input);
              setInput("");
            }}
            className="flex w-full max-w-2xl mx-auto items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0} className="rounded-full">
              <Send />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
    </>
  );
}
