"use client"

import { useState } from "react"
import { Box, Paper, Typography, Button, Avatar, IconButton, Stack } from "@mui/material"
import { styled } from "@mui/material/styles"
import RefreshIcon from "@mui/icons-material/Refresh"
import OpenInFullIcon from "@mui/icons-material/OpenInFull"
import CloseIcon from "@mui/icons-material/Close"

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

const DateDivider = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2, 0),
  textAlign: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}))

const DateText = styled(Typography)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  padding: theme.spacing(0, 2),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  fontSize: 14,
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

const OptionButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: 24,
  textTransform: "none",
  padding: theme.spacing(1, 2),
  justifyContent: "center",
  fontWeight: "normal",
  ...(variant === "outlined" && {
    borderColor: "#7e22ce",
    color: "#7e22ce",
    "&:hover": {
      backgroundColor: "#f5f3ff",
      borderColor: "#7e22ce",
    },
  }),
  ...(variant === "contained" && {
    backgroundColor: "#7e22ce",
    color: "white",
    "&:hover": {
      backgroundColor: "#6b21a8",
    },
  }),
}))

const Footer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderTop: `1px solid ${theme.palette.divider}`,
  textAlign: "center",
}))

export default function ChatInterface() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

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
              Finch from Sendbird
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton size="small" sx={{ color: "#7e22ce" }}>
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

        {/* Date Divider */}
        <DateDivider>
          <DateText>October 15, 2024</DateText>
        </DateDivider>

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
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
            Finch from Sendbird
          </Typography>

          {/* First message */}
          <Stack direction="column" alignItems="flex-start" spacing={0.5}>
            <MessageBubble>
              <Typography variant="body1">Hi! 👋 I'm Finch, and I'll be your guide to Sendbird today.</Typography>
            </MessageBubble>
            <TimeStamp>5:55 PM</TimeStamp>
          </Stack>

          {/* Second message */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Avatar sx={{ bgcolor: "#7e22ce", width: 32, height: 32 }} />
            <Stack direction="column" alignItems="flex-start" spacing={0.5}>
              <MessageBubble>
                <Typography variant="body1">What interests you about customer communications?</Typography>
              </MessageBubble>
              <TimeStamp>5:55 PM</TimeStamp>
            </Stack>
          </Box>

          {/* Options */}
          <Stack spacing={1} sx={{ py: 1 }}>
            <OptionButton variant="outlined" onClick={() => setSelectedOption("chatbot")}>
              An AI chatbot to suggest products, generate leads, or handle customer inquiries
            </OptionButton>

            <OptionButton variant="outlined" onClick={() => setSelectedOption("omnichannel")}>
              Omnichannel business messaging
            </OptionButton>

            <OptionButton variant="contained" onClick={() => setSelectedOption("secure")}>
              Secure and scalable in-app chat
            </OptionButton>
          </Stack>

          {/* Follow-up message (only shown after selection) */}
          {selectedOption && (
            <>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
                Finch from Sendbird
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Avatar sx={{ bgcolor: "#7e22ce", width: 32, height: 32 }} />
                <Stack direction="column" alignItems="flex-start" spacing={0.5}>
                  <MessageBubble>
                    <Typography variant="body1">
                      Great choice! Which industry are you in? Or what specific challenges or use cases would you like
                      to address?
                    </Typography>
                  </MessageBubble>
                  <TimeStamp>5:55 PM</TimeStamp>
                </Stack>
              </Box>
            </>
          )}
        </Box>

        {/* Footer */}
        <Footer>
          <Typography variant="body2" color="text.secondary">
            Powered by{" "}
            <Box component="span" fontWeight={600}>
              sendbird
            </Box>
          </Typography>
        </Footer>
      </ChatContainer>
    </Box>
  )
}

