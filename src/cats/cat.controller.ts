import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "./interfaces/cat.interface";


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

    @Get(':id')
    findOne(@Param('id') id: string) : Observable<string>  {
      return of(`This action returns a #${id} cat`);
    }
  

}