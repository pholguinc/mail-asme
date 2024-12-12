export interface MailInterface{
    id: number;
    asunto: string;
    nombre: string;
    apellido: string;
    mail: string;
    telefono: string;
    consulta: string;
    destinatario: string;
    tema: string;
    fecha: Date;
    estado: number;
    resumen:string;
    usuModificacion: number;
    fechaModificacion: Date;
    fechaReasignacion: Date;
    usuReasignacion: number;
    tipo: number;
    programacion: number;
    usuRegistro: number;
    fechaInteraccion: Date;
    idContacto: number;
    pais: string;
    idCurso: number;
    idFranquicia: number;
    idEntidad: number;
}
