import { Body, Controller, Put } from '@nestjs/common';
import { RefreshTokenDto } from './token.dto';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
    constructor(private readonly tokenService:TokensService){}

    @Put('refresh')
    async refreshToken(@Body() data:RefreshTokenDto):Promise<any>{
        const refreshedDataToken = await this.tokenService.refreshToken(data.oldToken);
        return refreshedDataToken;
    }
}
