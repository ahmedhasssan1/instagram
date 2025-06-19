import { Inject, Injectable } from '@nestjs/common';
import { MessageBird } from 'messagebird/types';

@Injectable()
export class MessageBirdService {
  constructor(
    @Inject('MessageBirdClient')
    private readonly messageBird: MessageBird,
  ) {}

  async sendMessage(payload: { recipient: string; message: string }) {
    var params = {
      originator: '***********',
      recipients: [payload.recipient],
      body: payload.message,
    };

    this.messageBird.messages.create(params, function(err, response) {
      if (err) {
        console.error('unable to send text message at the moment');
        return;
      }

      console.log(
        '🚀 ~ file: message-bird.service.ts ~ line 20 ~ MessageBirdService ~ this.messageBird.messages.create ~ response',
        response,
      );
    });
  }
}