import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
 
@Injectable()
export class LocalAuthenticationGuardUser extends AuthGuard('local') {}

@Injectable()
export class LocalAuthenticationGuardDriver extends AuthGuard('local') {}