export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  users: {
    id: string;
    login: string;
    password: string;
  };
};
