import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsController }  from './cat.controller'; 
import { CatsService } from "./cats.service";

@Module({
    controllers: [CatsController],
    providers: [CatsService]
})
export class CatsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply()
            .forRoutes('cats')
    }
}