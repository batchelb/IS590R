import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CoreService } from '../core.service';
import { ViewCompiler } from '@angular/compiler';

@Component({
  selector: 'app-lex-chat-bot',
  templateUrl: './lex-chat-bot.component.html',
  styleUrls: ['./lex-chat-bot.component.less']
})
export class LexChatBotComponent implements OnInit {
  @ViewChild('responseEl') responseEl;
  @ViewChild('innerResponse') innerResponse;
  showBot = true;
  userResponse = 'View News'
  userId = Math.floor(Math.random() * 1000000);
  window:any = window;
  removeFlexEnd = false;
  responses = []
  constructor(private coreService: CoreService) { }

  ngOnInit() {
    this.postResponse()
  }

  addResponse() {
    if(this.userResponse) {
      this.responses.push({
        type:'user',
        message: this.userResponse
      });
      this.postResponse();
    }
  }

  postResponse() {
      this.window.lexruntime.postText({
        botAlias: '$LATEST',
        botName: 'NewsChatBot',
        inputText: this.userResponse,
        userId: this.userId.toString(),
        sessionAttributes: {}
      }, (err,lexResponse)=>{
        if(lexResponse.dialogState === 'Fulfilled') {
          this.coreService.getNews(lexResponse.slots.Endpoint, lexResponse.slots.Category, lexResponse.slots.Country);
          this.showBot = false;
        }
        this.responses.push({
          type:'lex',
          message: lexResponse.message,
          responseCard:lexResponse.responseCard
        });
        this.scroll();

      });
      this.userResponse = '';
      this.scroll();
    }


  scroll() {
    setTimeout(() => {
      this.responseEl.nativeElement.scrollTop += this.responseEl.nativeElement.scrollHeight;
      setTimeout(()=>{
        if(this.responseEl.nativeElement.clientHeight < this.innerResponse.nativeElement.clientHeight && !this.removeFlexEnd){
          this.removeFlexEnd = true;
          this.scroll()
        }
      })
    });
  }
}
