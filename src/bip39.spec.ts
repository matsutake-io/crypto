import { bip39 } from './bip39';

describe('bip39', () => {
    describe('generateMnemonic', () => {
        it('generates new mnemonic', () => {
            const mnemonic = bip39.generateMnemonic();
            const words = mnemonic.split(' ');

            expect(words.length).toBe(12);
        });
    });

    describe('mnemonicToSeed', () => {
        it('converts mnemonic to seed', async () => {
            const seed = await bip39.mnemonicToSeed('erosion turn drill assault cash tooth lonely metal ability point river year');

            expect(seed).toBe('16b70006cdd0c55a36f99f97f7ae53d50434041da1dc486ae090198ea1dc2cbe3d7b3d9167d24adaa8161af276863b072d924271af93a828ad2935c20d85ef3f');
        });
    });
});
