import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CatsController }  from './cat.controller'; 
import { CatsService } from "./cats.service";
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RolesGuard } from './role.guards';
import { ValidationPipe } from './validation.pipe';

@Module({
    controllers: [CatsController],
    providers: [CatsService
        ,{
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
        ,{
            provide: APP_PIPE,
            useClass: ValidationPipe,
        }
        ,{
            provide: APP_GUARD,
            useClass: RolesGuard,
        }
    ]
})
export class CatsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .exclude({ path: 'cats', method: RequestMethod.GET })
            .forRoutes({path:'cats', method: RequestMethod.ALL})
    }
}