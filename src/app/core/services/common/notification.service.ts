import { Injectable } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { NotificationType } from "../../enums/notification-type.enum";



@Injectable({
    providedIn:'root'
})



export class NotificationService {

   private notifier!:NotifierService;

    constructor(notifier:NotifierService){
        this.notifier = notifier;

    }


    public showNotification( type: NotificationType, message: string ): void {
		this.notifier.notify( type, message );
	}


    public showErrorNotification(statusCode:any, message: string ):void {
       switch (statusCode) {
        case 400: return this.showNotification(NotificationType.WARNING,message);
            break;
        case 401:this.showNotification(NotificationType.ERROR,message);
            break;
       
        default:this.showNotification(NotificationType.DEFAULT,'UNE ERREUR EST SURVENU, VUEILLEZ ESSAYER PLUS TARD');
            break;
       }
    }




}