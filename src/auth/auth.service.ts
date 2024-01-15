import { Dependencies, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
@Dependencies(UsersService, JwtService)
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(username: string, pass: string) {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }

  async register(username: string, password: string) {
    const userExists = await this.usersService.findOne(username);
    if (userExists) {
      throw new UnauthorizedException();
    }
    return this.usersService.add(username, password);
  }

  async deleteUser(username: string) {
    const userExists = await this.usersService.findOne(username);
    if (!userExists) {
      throw new UnauthorizedException();
    }
    return this.usersService.remove(userExists.id);
  }

}