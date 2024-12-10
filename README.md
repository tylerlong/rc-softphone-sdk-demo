# RingCentral Softphone SDK Demo

[RingCentral Softphone SDK](https://github.com/ringcentral/ringcentral-softphone-ts)

This demo starts a softphone instance and waiting for inbound calls.

Whenever there is an inbound call, the demo will auto answer the call and does the following two things:

1. repeatly play "test.wav" to to caller, never stop
2. if the caller press "\*", the call will be transferred to another predefined number.

## Setup

```
yarn install
```

In order to run it, you will need to create a `.env` file with the following content:

```
SIP_INFO_OUTBOUND_PROXY=sip10.ringcentral.com:5096
SIP_INFO_DOMAIN=sip.ringcentral.com
SIP_INFO_USERNAME=
SIP_INFO_PASSWORD=
SIP_INFO_AUTHORIZATION_ID=
ANOTHER_CALLEE_FOR_TESTING=
```

`ANOTHER_CALLEE_FOR_TESTING` is the number to transfer to when caller presses "\*".

## Test

```
yarn test
```

Make a call to the softphone instance. Normally, you should be able to reach it by dialing `SIP_INFO_USERNAME`.

Listen to the audio and confirm that you can hear something. Confirm that what your heard is repeated endlessly.

Press "\*" and confirm that the call is transferred.

## Audio format requirement

The audio to be sent to the caller must be playable by command:

```
play -t raw -b 16 -r 16000 -e signed-integer test.wav
```

For more information, please refer to [audio formats](https://github.com/ringcentral/ringcentral-softphone-ts?tab=readme-ov-file#audio-formats).

## Issues

The 8th audio streaming becomes silent.
