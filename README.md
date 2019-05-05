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
const { createClient } = require('pigeon-node');

// Initialize Pigeon SDK
const Pigeon = createClient({
  publicKey: process.env.PIGEON_PUBLIC_KEY,
  privateKey: process.env.PIGEON_PRIVATE_KEY,
});

// Start sending messages
Pigeon.deliver('message-identifier', { to: 'john@example.com' }).then(_ => console.log('Mail Sent'));
```

## Examples

#### Multiple recipients

```javascript
Pigeon.deliver('message-identifier', {
  to: 'John Doe <john@example.com>',
  cc: ['admin@example.com', 'sales@example.com>'],
})
  .then(() => console.log('Mail Sent'))
  .catch(e => {
    console.log('Failed to send mail, more:', e);
  });
```

#### Template variables

```javascript
Pigeon.deliver('message-identifier', {
  to: 'john@example.com',
  data: { name: 'John' },
})
  .then(() => console.log('Mail Sent'))
  .catch(e => {
    console.log('Failed to send mail, more:', e);
  });
```

#### Multiple mails

```javascript
Pigeon.deliver('message-identifier', [
  {
    to: 'John Doe <john@example.com>',
    data: { greet: 'Hi John' },
  },
  {
    to: 'Jane Doe <jane@example.com>',
    data: { greet: 'Hi Jane' },
  },
])
  .then(() => console.log('Mail Sent'))
  .catch(e => {
    console.log('Failed to send mail, more:', e);
  });
```

#### Attachment support

```javascript
Pigeon.deliver('message-identifier', {
  to: 'jane@example.com',
  attachments: [
    {
      file: '/path/to/handbook.pdf',
      name: 'Handbook',
    },
  ],
})
  .then(() => console.log('Mail Sent'))
  .catch(e => {
    console.log('Failed to send mail, more:', e);
  });
```

#### Use with `async/await`

```javascript
(async () => {
  try {
    await Pigeon.deliver('message-identifier', { to: 'john@example.com' });
  } catch (error) {
    console.log(error);
  }
})();
```
