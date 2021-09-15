import { Request } from 'express';
import { DriverEntity } from 'src/db/entities/driver.entity';
 
interface RequestWithDriver extends Request {
  driver: DriverEntity;
}
 
export default RequestWithDriver;

