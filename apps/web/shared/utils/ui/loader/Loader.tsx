import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background: "linear-gradient(135deg, #1e1f23 0%, #2f3136 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
          radial-gradient(circle at 20% 20%, rgba(88, 101, 242, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(88, 101, 242, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(88, 101, 242, 0.05) 0%, transparent 50%)
        `,
          animation: "pulse 3s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": { opacity: 0.5 },
            "50%": { opacity: 1 },
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
          padding: 4,
          borderRadius: 3,
          background: "rgba(36, 38, 41, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(88, 101, 242, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            marginBottom: 3,
          }}
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: "#5865F2",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#5865F2",
                animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                "@keyframes ping": {
                  "75%, 100%": {
                    transform: "scale(2)",
                    opacity: 0,
                  },
                },
              }}
            />
          </Box>
        </Box>

        <Typography
          variant="h6"
          sx={{
            color: "#dcddde",
            fontWeight: 600,
            marginBottom: 1,
            textAlign: "center",
          }}
        >
          Loading
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#72767d",
            textAlign: "center",
            fontSize: "0.875rem",
          }}
        >
          Waiting for the response ...
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 2,
            gap: 0.5,
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#5865F2",
                animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`,
                "@keyframes bounce": {
                  "0%, 80%, 100%": {
                    transform: "scale(0)",
                  },
                  "40%": {
                    transform: "scale(1)",
                  },
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
