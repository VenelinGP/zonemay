import { Injectable } from "@angular/core";
import { Message } from "../_models/message";
import { Observable } from "rxjs";

@Injectable()
export class ToastService {
  constructor(private db: Message[]) {}

  // getMessages(): Observable<Message[]> {
  //   return this.db("/messages", {
  //     query: {
  //       orderByKey: true,
  //       limitToLast: 5
  //     }
  //   });
  // }

  // sendMessage(content, style) {
  //   const message = new Message(content, style);
  //   this.db.find("/messages").push(message);
  // }

  // dismissMessage(messageKey) {
  //   this.db.find(`messages/${messageKey}`).update({ dismissed: true });
  // }
}
