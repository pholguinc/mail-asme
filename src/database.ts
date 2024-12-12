import {createPool, PoolOptions} from 'mysql2/promise';
import dotenv from "dotenv";
dotenv.config();


export function connect(){
    const connection = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: Number(process.env.PORT_DB),
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
    } as PoolOptions); 
    return connection;
}
