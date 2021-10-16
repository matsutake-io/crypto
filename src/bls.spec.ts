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
});