import express, {Application} from 'express';
import morgan from 'morgan';
import cors from "cors";

//TODO: Cragamos las rutas
import IndexRoutes from './routes/index.routes'
import MailRoutes from "./routes/mail.routes";


export class App{

    private app: Application;
    

    constructor(private port?:number | string){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();

    }

    settings(){
        this.app.set('port', this.port || process.env.PORT || 3000)
    }

    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(){
        this.app.use(IndexRoutes);
        this.app.use("/api/mails", MailRoutes);
       
    }

    async listen(){
        this.app.listen(this.app.get('port'));
        console.log(`Server port on`, this.app.get('port'))
    }


}
