module.exports = {
  apps: [
    {
      name: "backend",
      script: "server.js",
      watch: false,
    },
    {
      name: "frontend",
      script: "npm",
      args: "run start",
      watch: false,
    },
  ],
}; 