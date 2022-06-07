import { FoodModule } from './modules/food/food.module';
import { ClientModule } from './modules/client/client.module';
import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [AdminModule, ClientModule, FoodModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
