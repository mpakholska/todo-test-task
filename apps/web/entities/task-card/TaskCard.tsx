import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export type User = {
  id: number;
  login: string;
};

export type TaskCardProps = {
  title: string;
  description: string;
  completed: boolean;
  users: User[];
  onEdit?: () => void;
};

export default function TaskCard({
  title,
  description,
  completed,
  users,
  onEdit,
}: TaskCardProps) {
  return (
    <Card
      sx={{
        backgroundColor: "#2f3136",
        border: "1px solid #202225",
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
        p: 2,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" sx={{ color: "#dcddde", fontWeight: 600 }}>
            {title}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
              <Chip
                label={completed?"Completed": "Incompleted"}
                size="small"
                sx={{
                  backgroundColor: completed?"#43b581":"red",
                  color: "#fff",
                  fontWeight: 500,
                }}
              />
            <Tooltip title="Edit Task">
              <IconButton size="small" onClick={onEdit}>
                <EditIcon sx={{ color: "#dcddde", fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography sx={{ color: "#b9bbbe", fontSize: "0.95rem", mb: 2 }}>
          {description}
        </Typography>

        {users && users.length > 0 && (
          <Stack direction="row" spacing={1}>
            {users.map((user) => (
              <Chip
                key={user.id}
                label={user.login}
                size="small"
                sx={{
                  backgroundColor: "#5865F2",
                  color: "#fff",
                  fontWeight: 500,
                }}
              />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
