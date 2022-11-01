import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SignInResponse } from './dto/sign-in-response.dto';
import { SignUpDto } from './dto/sign-in.dto';
import { SignInDto } from './dto/sign-up.dto';
import { User } from './entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Query(() => User)
  me() {
    const email = 'john@mail.com';

    return this.usersService.findOne(email);
  }

  @Mutation(() => User)
  signUp(@Args('signUpDto') dto: SignUpDto): Promise<any> {
    return this.authService.signUp(dto);
  }

  @Mutation(() => SignInResponse)
  signIn(@Args('signUpDto') dto: SignInDto): Promise<SignInResponse> {
    return this.authService.signIn(dto);
  }
}
