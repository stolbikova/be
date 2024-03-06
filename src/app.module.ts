import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { PdfController } from './pdf/pdf.controller';
import { PdfService } from './pdf/pdf.service';

@Module({
  imports: [
    ChatModule,
    MongooseModule.forRoot('mongodb://localhost/chats', {
      // additional options if needed
    }),
  ],
  controllers: [AppController, PdfController],
  providers: [AppService, PdfService],
})
export class AppModule {}
