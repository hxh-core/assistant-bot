import { BotNavigation } from '@/lib/common';
import { emojis } from '@/lib/utils';
import { BotUser, BotUserSettings } from '@prisma/client';
import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const servicesKeyboard = (
  user: BotUser & { settings: BotUserSettings },
): InlineKeyboardMarkup => {
  const keyboard = [
    [
      Markup.button.callback(
        `${emojis.setting} Настройки`,
        BotNavigation.user.scenes.settings.enter,
      ),
    ],
  ];

  if (user.isAdmin) {
    keyboard.unshift([
      Markup.button.callback(
        `${emojis.website} Сайты`,
        BotNavigation.user.scenes.site.choose.enter,
      ),
    ]);
  }
  return {
    inline_keyboard: keyboard,
  };
};
