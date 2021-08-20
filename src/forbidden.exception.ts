import { HttpException, HttpStatus } from "@nestjs/common";


export class ForbiddenException extends HttpException {
    constructor(){
        super('you are not allowed to access', HttpStatus.FORBIDDEN);
    }
}