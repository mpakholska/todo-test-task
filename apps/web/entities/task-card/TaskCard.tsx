import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

export type User = {
    id: number;
    login: string;
}

export type TaskCardProps = {
 title: string;
 description:string;
 users: User[]
}

export default function TaskCard({title, description, users}: TaskCardProps){
    return (
        <Card
        sx={{
          backgroundColor: "#2f3136",
          border: "1px solid #202225",
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ color: "#dcddde" }}>
            {title}
          </Typography>
          <Typography sx={{ color: "#b9bbbe", mt: 1 }}>
            {description}
          </Typography>
          {users && users.length > 0 && (
            <Stack direction="row" spacing={1} mt={2}>
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
    )
}