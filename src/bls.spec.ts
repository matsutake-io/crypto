import { bls } from './bls';

const examplePrivateKey = '2f6c2974aa69aa0b1028d6e742e4e9a0c7ad3ab06104c17f28b0e533b5a417bb';
const examplePrivateKey2 = '6f296e68926a4788bbb941b39ddae3941f660e0fb0b2dcc6cc10d9f903dee547';
const examplePublicKey = '844aa91ea7407347d58bbc703643b278d7d21141ab380abeeae5a4b99d13178d62f9786a696aaab4dbe593e1ea269b2c';
const exampleMessage = '天皇';
const exampleSignature = '869cbbbb74261f600f9bbe9b13da47fe281777dd777916a0a1d46cf949ce061ec3a6dbcb9f3c18f2fc7326d5a89260f800c82f7bb6d1626dadfaa14932f9d25f4c21054010f14a9f8a3c0d8d45a1aa2ff4d1b15e8342aa5b3ba1bc359d8f3f4f';
const exampleAggregateSignature = 'a1e9908aeed1728a74ae4af8118f3fda76f3591ffc05a5f81148a6e56f48c70438fb85dff8594ba1dd38837234fac95b052de5de3127e2688d00df03f06d320e8c5dce9c5cf0eb44e5f3bbca23168dfa7ac12db3924db7bad39c08d80c048652';

describe('bls', () => {
    describe('generatePrivateKey', () => {
        it('generates a random private key', () => {
            const privateKey = bls.generatePrivateKey();

            expect(privateKey.length).toEqual(64);
        });
    });

    describe('generatePublicKey', () => {
        it('generates a public key from a private key', () => {
            const publicKey = bls.generatePublicKey(examplePrivateKey);

            expect(publicKey).toBe(examplePublicKey);
        });
    });

    describe('sign', () => {
        it('signs a message', async () => {
            const signature = await bls.sign(examplePrivateKey, exampleMessage);

            expect(signature).toBe(exampleSignature);
        });
    });

    describe('verify', () => {
        it('verifies a signature', async () => {
            const result = await bls.verify(examplePublicKey, exampleSignature, exampleMessage);

            expect(result).toBe(true);
        });

        it('rejects a signature', async () => {
            const newPrivateKey = bls.generatePrivateKey();
            const newPublicKey = bls.generatePublicKey(newPrivateKey);
            const result = await bls.verify(newPublicKey, exampleSignature, exampleMessage);

            expect(result).toBe(false);
        });
    });

    describe('aggregate', () => {
        it('aggregates multiple signatures together', async () => {
            const signature1 = await bls.sign(examplePrivateKey, exampleMessage);
            const signature2 = await bls.sign(examplePrivateKey2, exampleMessage);

            const aggregateSignature = await bls.aggregate([signature1, signature2]);

            expect(aggregateSignature).toBe(exampleAggregateSignature);
        });
    });

    describe('aggregateVerify', () => {
        it('verifies an aggregate signature', async () => {
            const publicKey1 = bls.generatePublicKey(examplePrivateKey);
            const publicKey2 = bls.generatePublicKey(examplePrivateKey2);

            const result = await bls.aggregateVerify([publicKey1, publicKey2], [exampleMessage, exampleMessage], exampleAggregateSignature);

            expect(result).toBe(true);
        });

        it('rejects an aggregate signature', async () => {
            const publicKey1 = bls.generatePublicKey(examplePrivateKey);
            const privateKey = bls.generatePrivateKey();
            const publicKey2 = bls.generatePublicKey(privateKey);

            const result = await bls.aggregateVerify([publicKey1, publicKey2], [exampleMessage, exampleMessage], exampleAggregateSignature);

            expect(result).toBe(false);
        });
    });
});
