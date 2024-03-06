import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OpenAI } from 'openai';
import { Model } from 'mongoose';

import { CreateChatDto } from './chat.dto';
import { Chat, ChatDocument } from './chat.schema';

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor(@InjectModel(Chat.name) private catModel: Model<ChatDocument>) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getResponse(prompt: string): Promise<string> {
    const response: OpenAI.Chat.ChatCompletion =
      await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });
    console.log('-->', response.choices[0].message);

    // Parse text

    return response.choices[0].message.content;
  }

  async create(createCatDto: any): Promise<Chat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Chat[]> {
    return this.catModel.find().exec();
  }
}
