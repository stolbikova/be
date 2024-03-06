import { Controller, Post, Body, Res, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './chat.dto';

@Controller('chat-gpt')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body('message') message: string, @Res() response) {
    const chatResponse = await this.chatService.getResponse(message);
    response.status(200).send(chatResponse);
  }

  @Get('')
  async geAll(@Res() response) {
    const chatResponse = await this.chatService.findAll();
    response.status(200).send(chatResponse);
  }

  @Post('question')
  async createQuestion(
    @Body() createQuestionDto: CreateChatDto,
    @Res() response,
  ) {
    let res;
    if (createQuestionDto.name && createQuestionDto.question)
      res = await this.chatService.create({
        name: createQuestionDto.name,
        question: createQuestionDto.question,
      });
    response.status(200).send(res);
  }
}
