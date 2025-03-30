"use client"

import { useState, useEffect } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import LoginPage from "@/components/login-page"
import dynamic from 'next/dynamic'

// Create a theme instance
const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#3b5fe2", // Blue color from the login page
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          overflow: "hidden",
        },
      },
    },
  },
})

const ChatInterface = dynamic(() => import('../components/chat-interface'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{ 
        textAlign: 'center',
        color: '#7e22ce',
        fontSize: '1.2rem',
        fontWeight: 500
      }}>
        Loading chat interface...
      </div>
    </div>
  )
})

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log('Home component mounted')
  }, [])

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn)
    console.log('userId:', userId)
  }, [isLoggedIn, userId])

  const handleLogin = (userId: string) => {
    setUserId(userId)
    setIsLoggedIn(true)
  }

  if (!mounted) {
    return null
  }

  console.log('Rendering Home component')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn ? <ChatInterface userId={userId} /> : <LoginPage onLogin={handleLogin} />}
    </ThemeProvider>
  )
}

