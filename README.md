# Matsutake Crypto

Crypto utilities for Chia defi application development; BLS and BIP32.

```TypeScript
const message = '天皇';
const privateKey = await bls.generatePrivateKey();
const publicKey = bls.generatePublicKey(privateKey);
const signature = await bls.sign(privateKey, message);
const result = await bls.verify(publicKey, signature, message);
```

Please enjoy!

[matsutake.io](https://www.matsutake.io)