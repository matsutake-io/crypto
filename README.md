# Matsutake Crypto

Crypto utilities for Chia defi application development; BLS and BIP32. TypeScript first, no wasm which makes it easier to support multiple browsers and use from web apps built with Webpack (e.g. React).

```TypeScript
const privateKey1 = bls.generatePrivateKey();
const privateKey2 = bls.generatePrivateKey();

const publicKey1 = bls.generatePublicKey(privateKey1);
const publicKey2 = bls.generatePublicKey(privateKey2);

const signature1 = await bls.sign(examplePrivateKey1, 'message1');
const signature2 = await bls.sign(examplePrivateKey2, 'message2');

const aggregateSignature = await bls.aggregate([signature1, signature2]);

await bls.aggregateVerify([publicKey1, publicKey2], ['message1', 'message2'], aggregateSignature);
```

## Future work

The following is currently not supported but should be in future (PRs welcome!)

- BIP39 seed to private key
- Derive child keys

Please enjoy!

[matsutake.io](https://www.matsutake.io)
