import { SiteModule } from '@/crud/site/site.module';
import { UsersModule } from '@/crud/users/users.module';
import { Module } from '@nestjs/common';
import { BotModule } from '../bot.module';
import { MainScene } from './Main.scene';
import { SettingsScene } from './settings';
import {
  ChangeUrlSite,
  ChooseSiteScene,
  CreateSiteScene,
  CurrentSiteScene,
  DeleteSiteScene,
  RenameSiteScene,
} from './sites';

@Module({
  imports: [SiteModule, BotModule, UsersModule],
  controllers: [],
  providers: [
    ChooseSiteScene,
    RenameSiteScene,
    CurrentSiteScene,
    MainScene,
    DeleteSiteScene,
    CreateSiteScene,
    ChangeUrlSite,
    SettingsScene,
  ],
  exports: [
    ChooseSiteScene,
    RenameSiteScene,
    CurrentSiteScene,
    MainScene,
    DeleteSiteScene,
    CreateSiteScene,
    ChangeUrlSite,
    SettingsScene,
  ],
})
export class SceneModule {}
