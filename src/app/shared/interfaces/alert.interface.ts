
 export const enum ColorAlert{
  success= "#47d662",
  info = "#3086eb",
  error= "#fe262a",
  warnig= "#ffc122",
}
export const enum NameAlert{
  success= "Completado",
  error= "Error",
  info = "Informacion",
  warnig= "Advertencia",
}
export interface AlertType{
   color:ColorAlert;
   icon:any;
   name:NameAlert;
   msj:String;

}
