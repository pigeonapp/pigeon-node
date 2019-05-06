# Pigeon Node

_Pigeon Node.js SDK_

<p>
  <a href="https://github.com/prettier/prettier">
        <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="prettier"/>
  </a>
  <a href="/LICENSE">
    <img src="https://badgen.net/badge/license/MIT/blue" alt="license"/>
  </a>
</p>

## Usage

```javascript
const Pigeon = require('pigeon-node');

// Initialize Pigeon SDK
const pigeon = Pigeon.createClient({
  publicKey: process.env.PIGEON_PUBLIC_KEY,
  privateKey: process.env.PIGEON_PRIVATE_KEY,
});

// Start sending messages
pigeon.deliver('message-identifier', { to: 'john@example.com' }).then(_ => console.log('Mail Sent'));
```

Can also be initialised with no parameters, `pigeon-node` will look for these env variables `PIGEON_PUBLIC_KEY` and `PIGEON_PRIVATE_KEY`.

```javascript
const Pigeon = require('pigeon-node');

// Initialize Pigeon SDK
const pigeon = Pigeon.createClient();
```

## Examples

#### Multiple recipients

```javascript
pigeon.deliver('message-identifier', {
  to: 'John Doe <john@example.com>',
  cc: ['admin@example.com', 'sales@example.com>'],
});
```

#### Template variables

```javascript
pigeon.deliver('message-identifier', {
  to: 'john@example.com',
  data: { name: 'John' },
});
```

#### Multiple mails

```javascript
pigeon.deliver('message-identifier', [
  {
    to: 'John Doe <john@example.com>',
    data: { greet: 'Hi John' },
  },
  {
    to: 'Jane Doe <jane@example.com>',
    data: { greet: 'Hi Jane' },
  },
]);
```

#### Attachment support

```javascript
pigeon.deliver('message-identifier', {
  to: 'jane@example.com',
  attachments: [
    {
      file: '/path/to/handbook.pdf',
      name: 'Handbook',
    },
  ],
});
```

#### Use with `then/catch`

```javascript
pigeon
  .deliver('message-identifier', {
    to: 'John Doe <john@example.com>',
    cc: ['admin@example.com', 'sales@example.com>'],
  })
  .then(() => console.log('Mail sent successfully'))
  .catch(e => console.log('Something went wrong', e));
```

#### Use with `async/await`

```javascript
(async () => {
  try {
    await pigeon.deliver('message-identifier', { to: 'john@example.com' });
  } catch (error) {
    console.log(error);
  }
})();
```
