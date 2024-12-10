import { readFileSync } from 'fs';

import Softphone from 'ringcentral-softphone';

const softphone = new Softphone({
  domain: process.env.SIP_INFO_DOMAIN,
  outboundProxy: process.env.SIP_INFO_OUTBOUND_PROXY,
  username: process.env.SIP_INFO_USERNAME,
  password: process.env.SIP_INFO_PASSWORD,
  authorizationId: process.env.SIP_INFO_AUTHORIZATION_ID,
});
softphone.enableDebugMode(); // print all SIP messages

const main = async () => {
  await softphone.register();
  softphone.on('invite', async (inviteMessage) => {
    // auto answer
    const callSession = await softphone.answer(inviteMessage);

    let shouldStream = true;

    // transfer to another number when '*' is pressed
    callSession.on('dtmf', async (digit) => {
      if (digit === '*') {
        shouldStream = false;
        await callSession.transfer(
          parseInt(process.env.ANOTHER_CALLEE_FOR_TESTING!, 10),
        );
      }
    });

    // repeatedly stream an audio file
    const streamAudio = async () => {
      console.log('audio streaming started');
      const streamer = callSession.streamAudio(readFileSync('test.wav'));
      return new Promise<void>((resolve) => {
        streamer.once('finished', () => {
          console.log('audio streaming finished');
          resolve();
        });
      });
    };

    callSession.once('disposed', () => {
      shouldStream = false;
    });
    while (shouldStream) {
      await streamAudio();
    }
  });
};
main();
