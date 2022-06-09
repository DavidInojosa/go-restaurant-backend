import { FoodModule } from './modules/food/food.module';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, FoodModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
