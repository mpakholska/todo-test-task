import { User } from '../entities/user.entity';

export type SafeUser = Omit<User, 'password'>;
export interface UserRepository {
  save(user: User): Promise<void>;
  findAll(): Promise<SafeUser[]>;
  findOne(login: string): Promise<User | null>;
}
