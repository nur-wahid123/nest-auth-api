import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Must have more than 2 charracters' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Must have more than 2 charracters' })
  content: string;
}
