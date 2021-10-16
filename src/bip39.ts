
import { generateMnemonic, mnemonicToSeed } from 'bip39';

export const bip39 = {
    generateMnemonic,
    mnemonicToSeed: async (mnemonic: string) => (await mnemonicToSeed(mnemonic)).toString('hex')
};
