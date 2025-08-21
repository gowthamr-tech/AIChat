import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MODE } from 'src/shared/shared.entity';

export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  messageId: string;

  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsEnum(MODE)
  mode: string;
}
