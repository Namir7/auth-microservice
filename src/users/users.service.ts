import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      email: 'john@mail.com',
      password: 'changeme',
    },
    {
      id: 2,
      email: 'maria@mail.com',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async createUser(dto: { email: string; password: string }): Promise<User> {
    const { email, password } = dto;

    const user: User = {
      id: this.users.length + 1,
      email,
      password,
    };

    this.users.push(user);

    return user;
  }
}
