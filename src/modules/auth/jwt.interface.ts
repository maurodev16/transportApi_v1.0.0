

export interface IJwtPayload { 
    id:number;
    email:string;
    //roles:RoleType[];
    iat?:Date;
}