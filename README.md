# Matsutake Crypto

Crypto utilities for Chia defi application development; BLS and BIP32.

```TypeScript
const message1 = '天皇';
const message2 = '竜';
const privateKey1 = await bls.generatePrivateKey(seed);
const privateKey2 = await bls.generatePrivateKey(`${seed.slice(0, seed.length -1)}a`);
const signature1 = await bls.sign(privateKey1, message1);
const signature2 = await bls.sign(privateKey2, message2);
const publicKey1 = bls.generatePublicKey(privateKey1);
const publicKey2 = bls.generatePublicKey(privateKey2);

const aggregateSignature = await bls.aggregate([signature1, signature2]);
const result = await bls.aggregateVerify([publicKey1, publicKey2], [message1, message2], aggregateSignature);
```

Please enjoy!

[matsutake.io](https://www.matsutake.io)
