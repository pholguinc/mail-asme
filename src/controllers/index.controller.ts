import {Request, Response} from 'express';

export function IndexApp (req:Request,res: Response){

    return res.json('Welcome to API Almacén');

}