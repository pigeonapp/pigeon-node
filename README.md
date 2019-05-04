# Pigeon Node

Pigeon Node.js SDK

## Usage

```javascript
const pigeonsdk = require('pigeon-node');

const Pigeon = pigeonsdk({ publicKey: process.env.PIGEON_PUBLIC_KEY, privateKey: process.env.PIGEON_PRIVATE_KEY });

Pigeon.deliver('message-identifier', { to: 'john@example.com' }).then(_ => console.log('Mail Sent'));
```
