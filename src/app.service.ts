import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello MAURO!';
  }

  getObjeto(): any {
    let objeto = {
      id: 1,
      nome: "Mauro Rodrigues",
    }
    return objeto
  }

}
