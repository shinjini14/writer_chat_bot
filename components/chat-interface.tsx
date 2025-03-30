"use client"

import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react"
import { Box, Paper, Typography, Avatar, IconButton, Stack, TextField, Alert } from "@mui/material"
import { styled } from "@mui/material/styles"
import RefreshIcon from "@mui/icons-material/Refresh"
import OpenInFullIcon from "@mui/icons-material/OpenInFull"
import CloseIcon from "@mui/icons-material/Close"
import SendIcon from "@mui/icons-material/Send"

// Define the types for messages
interface Message {
    sender: string;
    message: {
        text: string;
        message_id: string;
    } | null;
    user: number;
    timestamp: string;
    message_id: string;
}

// Custom styled components
const ChatContainer = styled(Paper)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  boxShadow: "none",
}))

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

const MessageBubble = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  borderRadius: 16,
  maxWidth: "80%",
}))

const TimeStamp = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
  alignSelf: "flex-end",
  marginTop: 4,
}))

const Footer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}))

const InputField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  "& .MuiOutlinedInput-root": {
    borderRadius: 24,
    backgroundColor: theme.palette.grey[100],
  },
}))

// Create a client-side only timestamp component
const ClientTimeStamp = ({ timestamp }: { timestamp: string }) => {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    try {
      const date = new Date(timestamp);
      setFormattedTime(date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }));
    } catch (error) {
      console.error('Error formatting time:', error);
      setFormattedTime('');
    }
  }, [timestamp]);

  return <TimeStamp>{formattedTime}</TimeStamp>;
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 3000; // 3 seconds

export default function ChatInterface({ userId }: { userId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sendAllowed, setSendAllowed] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let retries = 0;

    const connectWebSocket = () => {
      if (userId !== null) {
        const socket = new WebSocket(`wss://34.170.31.117/api/idea-claude/?user_id=${userId}`);

        socket.onopen = () => {
          console.log("Connected to WebSocket server");
          retries = 0; // Reset retries on successful connection
        };

        socket.onclose = () => {
          console.warn("WebSocket closed, attempting to reconnect...");
          if (retries < MAX_RETRIES) {
            setTimeout(connectWebSocket, RETRY_DELAY);
            retries++;
          } else {
            console.error("Max retries reached, unable to connect to WebSocket.");
          }
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log('Received data:', data);
            if (data.event.name === 'user.new_message') {
              setMessages((prevMessages) => [...prevMessages, data]);
              if (data.sender === "Trope") {
                setSendAllowed(true);
                setIsTyping(false);
              }
            } else if (data.messages && typeof data.messages === 'string') {
              const parsedMessages = JSON.parse(data.messages);
              setMessages((prevMessages) => [...prevMessages, ...parsedMessages]);
            } else {
              console.warn('No valid messages received:', data);
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        setWs(socket);
      }
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [userId]);

  const handleLogin = () => {
    // Placeholder for login logic
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!sendAllowed || !newMessage.trim() || !ws || ws.readyState !== WebSocket.OPEN) {
      console.warn("Cannot send message: WebSocket is not open or message is empty.");
      return;
    }

    const messageData = {
      message: newMessage,
      "use_history": true,
      "event": "user.new_message"
    };

    try {
      ws.send(JSON.stringify(messageData));
      setNewMessage(""); // Clear the input field after sending
      setIsTyping(true);
      setSendAllowed(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <ChatContainer elevation={3}>
        {/* Header */}
        <Header>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: "#7e22ce", width: 32, height: 32 }} />
            <Typography variant="subtitle1" fontWeight={600}>
              Clairvoyant from Plotpointe
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton 
              size="small" 
              sx={{ color: "#7e22ce" }}
              onClick={() => {
                if (ws) {
                  ws.close();
                }
                const socket = new WebSocket(`ws://34.170.31.117/api/idea-claude/?user_id=${userId}`);
                setWs(socket);
              }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <OpenInFullIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Header>

        {/* Error Alert */}
        {/* {connectionError && (
          <Alert 
            severity="error" 
            sx={{ 
              m: 2,
              '& .MuiAlert-message': {
                flex: 1,
              }
            }}
          >
            {connectionError}
          </Alert>
        )} */}

        {/* Chat Content */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          {userId === null ? (
            <div>
              <h2>Login</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <Stack
                  key={`${msg.message_id}-${index}`}
                  direction="column"
                  alignItems={msg.sender === "Trope" ? "flex-start" : "flex-end"}
                  spacing={0.5}
                >
                  <MessageBubble>
                    <Typography variant="body1">
                      {msg.message?.text?.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      )) || ""}
                    </Typography>
                  </MessageBubble>
                  <ClientTimeStamp timestamp={msg.timestamp} />
                </Stack>
              ))}
              {isTyping && (
                <Stack direction="column" alignItems="flex-start" spacing={0.5}>
                  <MessageBubble>
                    <Typography variant="body1">
                      Trope is typing ✍️...
                    </Typography>
                  </MessageBubble>
                </Stack>
              )}
            </>
          )}
        </Box>

        {/* Footer with Input */}
        <Footer>
          <InputField
            fullWidth
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!sendAllowed || !!connectionError}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!sendAllowed || !newMessage.trim() || !!connectionError}
            sx={{ color: "#7e22ce" }}
          >
            <SendIcon />
          </IconButton>
        </Footer>
      </ChatContainer>
    </Box>
  )
}

