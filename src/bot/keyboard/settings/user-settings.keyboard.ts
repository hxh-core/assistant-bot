import { BotNavigation } from '@/lib/common';
import { emojis } from '@/lib/utils';
import { BotUser, BotUserSettings } from '@prisma/client';
import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const userSettingsKeyboard = (
  user: BotUser & { settings: BotUserSettings },
): InlineKeyboardMarkup => {
  const keyboard = [
    [
      Markup.button.callback(
        `${emojis.back} Назад`,
        BotNavigation.user.scenes.settings.exit.enter,
      ),
    ],
  ];

  if (user.isAdmin) {
    keyboard.unshift([
      Markup.button.callback(
        `${user.settings && user.settings.sendNewClaimMessages ? emojis.available : emojis.unavailable} Уведомления о заявках`,
        BotNavigation.user.scenes.settings.claimNotifications.enter,
      ),
    ]);
  }
  return {
    inline_keyboard: keyboard,
  };
};
