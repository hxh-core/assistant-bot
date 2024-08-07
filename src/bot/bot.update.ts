import type { CreateUserDto } from '@/crud/users/dto';
import { UsersService } from '@/crud/users/users.service';
import { BotNavigation, BotRoutes } from '@/lib/common';
import { Action, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { SceneContext } from 'telegraf/scenes';
import { BotService } from './bot.service';
import { servicesKeyboard } from './keyboard';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
    private readonly usersService: UsersService,
  ) {}

  @Start()
  async start(@Ctx() ctx: SceneContext) {
    const newUser: CreateUserDto = {
      firstName: ctx.from.first_name,
      lastName: ctx.from.last_name,
      username: ctx.from.username,
      languageCode: ctx.from.language_code,
      id: ctx.from.id,
      isBot: ctx.from.is_bot,

      settings: {
        sendNewClaimMessages: false,
      },
    };

    const user = await this.botService.addNewUser(newUser);

    await ctx.reply('Главное меню', {
      reply_markup: servicesKeyboard(user),
    });

    return;
  }

  @Action(BotRoutes.user.site.choose.value)
  async sites(@Ctx() ctx: SceneContext) {
    await ctx.scene.enter(BotNavigation.user.scenes.site.choose.enter, {
      firstMessage: 'edit',
    });
    return;
  }

  @Action(BotRoutes.user.settings.value)
  async settings(@Ctx() ctx: SceneContext) {
    await ctx.scene.leave();
    await ctx.scene.enter(BotNavigation.user.scenes.settings.enter, {
      firstMessage: 'edit',
    });
    return;
  }
}
