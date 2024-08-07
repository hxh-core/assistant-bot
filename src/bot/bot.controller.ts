import { IAdminMessage } from '@/lib/types';
import { Body, Controller, Post } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
  ) {}

  @Post('send-admin-message')
  create(@Body() message: IAdminMessage) {
    return this.botService.sendAdminMessage(this.bot, message);
  }
}
