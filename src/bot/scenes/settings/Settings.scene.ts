import { BotService } from '@/bot/bot.service';
import { userSettingsKeyboard } from '@/bot/keyboard';
import { SiteService } from '@/crud/site/site.service';
import { UsersService } from '@/crud/users/users.service';
import { BotRoutes, BotScenes } from '@/lib/common';
import { MenuSceneProps } from '@/lib/types';
import { emojis } from '@/lib/utils';
import { Inject } from '@nestjs/common';
import { BotUser, BotUserSettings } from '@prisma/client';
import { Action, Ctx, Wizard, WizardStep } from 'nestjs-telegraf';
import type { WizardContext } from 'telegraf/scenes';

@Wizard(BotRoutes.user.settings.value)
export class SettingsScene {
  constructor(
    @Inject() private siteService: SiteService,
    @Inject() private botService: BotService,
    @Inject() private usersService: UsersService,
  ) {}

  private name: string;
  private options: MenuSceneProps;
  private user: BotUser & { settings: BotUserSettings };

  @WizardStep(1)
  async enter(@Ctx() ctx: WizardContext): Promise<void> {
    this.options = ctx.scene.state as MenuSceneProps;
    const message = `<b>Настройки</b>\n\nВаш ID: <code>${ctx.from.id}</code>`;
    const user = await this.usersService.findById(ctx.from.id);

    if (user) {
      this.user = user;
    }

    if (this.options.firstMessage === 'edit') {
      await ctx
        .editMessageText(message, {
          reply_markup: userSettingsKeyboard(user),
          parse_mode: 'HTML',
        })
        .catch(() => {
          ctx.reply(message, {
            reply_markup: userSettingsKeyboard(user),
            parse_mode: 'HTML',
          });
        });
    } else {
      await ctx.reply(message, {
        reply_markup: userSettingsKeyboard(user),
        parse_mode: 'HTML',
      });
    }
    ctx.wizard.next();
    return;
  }

  // Изменить статус сайта
  @Action(BotRoutes.user.settings.claimNotifications.value)
  async changeClaimNotification(@Ctx() ctx: WizardContext): Promise<void> {
    const message = `<b>Настройки</b>\n\nВаш ID: <code>${ctx.from.id}</code>`;
    const newUser = await this.usersService.updateById(
      +this.user.id.toString(),
      {
        settings: {
          sendNewClaimMessages: !this.user.settings.sendNewClaimMessages,
        },
      },
    );
    await ctx.reply(message, {
      parse_mode: 'HTML',
      reply_markup: userSettingsKeyboard(newUser),
    });

    ctx.wizard.next();
    return;
  }

  // Выход из сцены
  @Action(BotRoutes.user.settings.exit.value)
  async exit(@Ctx() ctx: WizardContext) {
    await ctx
      .answerCbQuery()
      .catch(() =>
        ctx.reply(`${emojis.warning} Произошла ошибка, попробуйте раз`),
      );

    const sceneProps = BotScenes.user.menu({ firstMessage: 'edit' });
    await ctx.scene.leave();
    await ctx.scene.enter(sceneProps.sceneId, sceneProps.initialState);
    return;
  }
}
