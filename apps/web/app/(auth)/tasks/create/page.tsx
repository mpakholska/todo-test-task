import AddTaskForm from "@/features/add-task-form/AddTaskForm";
import { discordDarkTheme } from "@/shared/utils/styling/darkTheme";
import { ThemeProvider } from "@emotion/react";


export default function CreateTaskPage() {
    return (
        <ThemeProvider theme={discordDarkTheme}>
            <AddTaskForm />
        </ThemeProvider>
    )
}