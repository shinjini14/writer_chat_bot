"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material"
import { Visibility, VisibilityOff, ArrowForward } from "@mui/icons-material"

interface LoginPageProps {
  onLogin: (userId: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      onLogin(data.userId);
    } else {
      console.error("Login failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Left side - Login form */}
      <Box
        sx={{
          width: "50%",
          p: 6,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ mb: 8 }}>
          <img
            src="/plotpointe-logo.png"
            alt="Plot Pointe"
            style={{
              width: 180,
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>

        <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
          Welcome back
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Sign in to access your Plot Pointe dashboard
        </Typography>

        <form onSubmit={handleLogin}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
            Username
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "56px",
              },
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Password
            </Typography>
            <Link href="#" underline="none" sx={{ color: "primary.main" }}>
              Forgot password?
            </Link>
          </Box>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "56px",
              },
            }}
          />

          {error && (
            <FormHelperText error sx={{ mb: 2 }}>
              {error}
            </FormHelperText>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{
                  "&.Mui-checked": {
                    color: "primary.main",
                  },
                }}
              />
            }
            label="Remember me for 30 days"
            sx={{ mb: 3 }}
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              height: "56px",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "16px",
              mb: 3,
            }}
            onClick={handleLogin}
          >
            Sign in
          </Button>
        </form>

        <Typography variant="body2" align="center">
          Don't have an account?{" "}
          <Link href="#" underline="none" sx={{ color: "primary.main" }}>
            Create account
          </Link>
        </Typography>
      </Box>

      {/* Right side - Blue background with text */}
      <Box
        sx={{
          width: "50%",
          bgcolor: "#3b5fe2",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background circles */}
        <Box
          sx={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            top: "10%",
            right: "-100px",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            bottom: "10%",
            left: "-100px",
          }}
        />

        {/* Content */}
        <Box
          sx={{
            maxWidth: "500px",
            p: 4,
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography variant="h3" component="h2" sx={{ mb: 2, fontWeight: "bold" }}>
            Streamline Your Workflow
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "normal" }}>
            Access all your projects, analytics, and team collaboration tools in one place.
          </Typography>

          {/* Placeholder boxes */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mt: 4 }}>
            <Box sx={{ height: "80px", bgcolor: "rgba(255, 255, 255, 0.2)", borderRadius: "8px" }} />
            <Box sx={{ height: "80px", bgcolor: "rgba(255, 255, 255, 0.2)", borderRadius: "8px" }} />
            <Box sx={{ height: "80px", bgcolor: "rgba(255, 255, 255, 0.2)", borderRadius: "8px" }} />
            <Box sx={{ height: "80px", bgcolor: "rgba(255, 255, 255, 0.2)", borderRadius: "8px" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

