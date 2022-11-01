import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpDto {
  @Field()
  email: string;

  @Field()
  password: string;
}
