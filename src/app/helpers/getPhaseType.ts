export default function getPhaseTypeByName(type:string){ 
 
     switch(type){ 

         case "CADRAGE" : 
          return  "Cadrage"
          break ;  
         case "CONCEPTION" : 
          return "Conception" ; 
           break ;  
         case "REALISATION" : 
          return "Réalisation" ; 
           break ; 
         case "RECETTES" : 
          return "Recettes" ;  
           break ; 
         case "DEPLOIEMENT" : 
          return "Mise en production"   
          break ;      
         case "MAINTENANCE" : 
          return "Maintenance" ;  
          break ;
          case "ETL" :
           return "ETL" ; 
           break ; 
         case "CUBE" :
           return "CUBE" ;  
         case "REPORTING" :
           return "Reporting" ; 
          break ;
        default : 
           return type ;


             



     }

}

