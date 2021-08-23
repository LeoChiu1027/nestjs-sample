import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { ForbiddenException } from "src/forbidden.exception";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "./interfaces/cat.interface";
import { RolesGuard } from "./role.guards";


@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    create(@Body() createCatDto: CreateCatDto) : Observable<CreateCatDto> {
        this.catsService.create(createCatDto); 
        return of(createCatDto)
    }

    @Get()
    findAll(): Observable<Cat[]> {
        return of(this.catsService.findAll()); 
    }

    @Get('/vip')
    findVip() : Observable<string>  {
      throw new ForbiddenException();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Observable<Cat>{
        return of(this.catsService.findOne(id));
    }
  

}