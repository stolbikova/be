import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('generate')
  async generatePdf(@Body() params: { url: string }, @Res() res: Response) {
    try {
      if (params.url) {
        const pdfBuffer = await this.pdfService.generatePdf(params.url);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
          'Content-Disposition',
          'attachment; filename=download.pdf',
        );
        res.send(pdfBuffer);
      } else res.sendStatus(400);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error generating PDF');
    }
  }
}
