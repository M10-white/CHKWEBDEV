import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
});

@Controller('contact')
export class ContactController {
  @Post()
  @HttpCode(202)
  async post(@Body() body: unknown) {
    const data = schema.parse(body);
    await prisma.lead.create({ data });
    return { ok: true };
  }
}
