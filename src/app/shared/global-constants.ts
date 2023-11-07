export class GlobalConstants {

    //message
    public static genericError: string = "Something went wrong. Please try again later";

    public static unauthorized: string = "You are not authorized person to access this page.";

    //regx
    public static nameRegex = "[a-zA-Z0-9 ]*";

    public static emailRegex = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    
    public static contactNumberdRegex = "^[e0-9]{10,10}$";


    //variable
    public static error: string = "error";
}