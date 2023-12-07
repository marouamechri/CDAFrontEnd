export class GlobalConstants {

    //message
    public static genericError: string = "Quelque chose s'est mal passé. Veuillez réessayer plus tard.";

    public static unauthorized: string = "Vous n'êtes pas autorisée à accéder à cette page.";

    //regx
    public static nameRegex = "[a-zA-Z0-9-éèùàç ]*";

    public static emailRegex = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    
    public static contactNumberdRegex = "^[e0-9]{10,10}$";


    //variable
    public static error: string = "error";
}