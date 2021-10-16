import { bls } from './bls';

const seed = '16b70006cdd0c55a36f99f97f7ae53d50434041da1dc486ae090198ea1dc2cbe3d7b3d9167d24adaa8161af276863b072d924271af93a828ad2935c20d85ef3f';

describe('bls', () => {
    describe('generatePrivateKey', () => {
        it('generates a private key from a seed', async () => {
            const privateKey = await bls.generatePrivateKey(seed);

            expect(privateKey.serialize().toString()).toEqual('87,20,12,89,95,124,58,224,23,28,83,75,106,61,155,83,194,170,109,98,182,79,10,251,240,180,218,254,39,153,99,199');
        });

        it('generates a random private key', async () => {
            const privateKey = await bls.generatePrivateKey();

            expect(privateKey.serialize().length).toEqual(32);
        });
    });

    describe('generatePublicKey', () => {
        it('generates a public key', async () => {
            const privateKey = await bls.generatePrivateKey(seed);
            const publicKey = bls.generatePublicKey(privateKey);

            expect(publicKey.serialize().toString()).toBe('183,108,61,22,132,217,24,149,198,153,106,205,207,106,64,200,104,164,197,32,230,194,194,120,185,10,118,254,129,64,154,151,118,40,130,144,79,39,250,79,44,249,225,255,156,11,97,122');
        });
    });

    describe('sign', () => {
        it('signs a message', async () => {
            const privateKey = await bls.generatePrivateKey(seed);
            const signature = await bls.sign(privateKey, '天皇');

            expect(signature.serialize().toString()).toBe('130,82,165,104,198,80,8,232,171,154,4,230,204,162,211,34,104,89,97,118,8,94,177,83,28,129,232,67,112,73,124,243,249,97,36,251,188,187,244,108,138,32,238,255,126,159,137,239,21,23,72,55,52,169,59,2,69,192,77,133,214,50,237,114,53,86,0,69,119,176,7,244,250,194,45,46,211,62,16,102,227,104,140,35,248,14,189,21,210,0,88,53,25,39,83,73');
        });
    });

    describe('verify', () => {
        it('verifies a signature', async () => {
            const message = '天皇';
            const privateKey = await bls.generatePrivateKey(seed);
            const publicKey = bls.generatePublicKey(privateKey);
            const signature = await bls.sign(privateKey, message);
            const result = await bls.verify(publicKey, signature, message);

            expect(result).toBe(true);
        });

        it('rejects a signature', async () => {
            const message = '天皇';
            const firstPrivateKey = await bls.generatePrivateKey(seed);
            const secondPrivateKey = await bls.generatePrivateKey();
            const publicKeyFromSecondPrivateKey = bls.generatePublicKey(secondPrivateKey);
            const signaturefromFirstPrivateKey = await bls.sign(firstPrivateKey, message);
            const result = await bls.verify(publicKeyFromSecondPrivateKey, signaturefromFirstPrivateKey, message);

            expect(result).toBe(false);
        });
    });

    describe('aggregate', () => {
        it('aggregates multiple signatures together', async () => {
            const message1 = '天皇';
            const message2 = '竜';
            const privateKey1 = await bls.generatePrivateKey(seed);
            const privateKey2 = await bls.generatePrivateKey(`${seed.slice(0, seed.length -1)}a`);
            const signature1 = await bls.sign(privateKey1, message1);
            const signature2 = await bls.sign(privateKey2, message2);

            const aggregateSignature = await bls.aggregate([signature1, signature2]);

            expect(aggregateSignature.serialize().toString()).toBe('162,233,154,239,4,151,86,3,193,142,50,50,30,247,40,32,122,137,198,199,73,179,253,162,111,61,222,119,122,217,107,232,4,62,138,100,142,209,50,210,74,94,4,198,177,182,190,23,19,135,61,118,199,5,151,158,57,26,73,176,43,220,46,178,66,22,32,115,205,203,93,129,60,131,121,154,36,7,60,193,105,231,31,81,177,115,43,114,127,250,70,28,52,220,85,201');
        });
    });

    describe('aggregateVerify', () => {
        it('verifies an aggregate signature', async () => {
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

            expect(result).toBe(true);
        });

        it('rejects an aggregate signature', async () => {
            const message1 = '天皇';
            const message2 = '竜';
            const privateKey1 = await bls.generatePrivateKey(seed);
            const privateKey2 = await bls.generatePrivateKey(`${seed.slice(0, seed.length -1)}a`);
            const privateKey3 = await bls.generatePrivateKey(`${seed.slice(0, seed.length -1)}a`);
            const signature1 = await bls.sign(privateKey1, message1);
            const signature2 = await bls.sign(privateKey2, message2);
            const publicKey1 = bls.generatePublicKey(privateKey1);
            const publicKey2 = bls.generatePublicKey(privateKey2);
            const publicKey3 = bls.generatePublicKey(privateKey3);

            const aggregateSignature = await bls.aggregate([signature1, signature2]);
            const result = await bls.aggregateVerify([publicKey1, publicKey2, publicKey3], [message1, message2], aggregateSignature);

            expect(result).toBe(false);
        });
    });

    describe('generateChildPrivateKey', () => {
        it('generates a child private key', async () => {
            const privateKey = await bls.generatePrivateKey(seed);
            const childPrivateKey = await bls.generateChildPrivateKey(privateKey, 0);

            expect(childPrivateKey.serialize().toString()).toBe('52,131,132,232,108,148,169,164,164,115,186,49,223,52,87,0,109,156,93,166,62,225,218,103,154,150,123,42,24,200,138,54');
        });
    });

    describe('generateChildPrivateKeyUnhardened', () => {
        it('generates a child private key', async () => {
            const privateKey = await bls.generatePrivateKey(seed);
            const childPrivateKey = await bls.generateChildPrivateKeyUnhardened(privateKey, 0);

            expect(childPrivateKey.serialize().toString()).toBe('77,131,240,48,103,109,176,185,119,76,64,73,219,192,128,185,57,255,140,248,255,180,139,65,196,42,232,222,10,86,41,203');
        });
    });

    describe('generateChildPublicKeyUnhardened', () => {
        it('generates a child public key', async () => {
            const privateKey = await bls.generatePrivateKey(seed);
            const publicKey = bls.generatePublicKey(privateKey);
            const childPublicKey = await bls.generateChildPublicKeyUnhardened(publicKey, 0);

            expect(childPublicKey.serialize().toString()).toBe('131,10,211,66,134,157,65,139,159,253,221,165,114,115,3,255,243,103,176,246,253,216,121,0,151,70,253,18,222,243,53,245,5,2,72,179,213,227,181,22,41,132,203,229,231,49,97,165');
        });
    });
});
