import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    
    public sidebarOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

    isMobile() {
        let ua = navigator.userAgent
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
            return true
        } else if (/Chrome/i.test(ua)) {
            return false
        } else {
            return false
        }
    }

    customGetRangeLabel(page, pageSize, length) {
        if (length == 0 || pageSize == 0) {
            return "0 de " + length;
        }
        length = Math.max(length, 0);
        /** @type {?} */
        var startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        /** @type {?} */
        var endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return startIndex + 1 + " - " + endIndex + " de " + length;
    }

}