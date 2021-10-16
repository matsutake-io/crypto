import asyncLoadBls, { G1Element, G2Element, PrivateKey } from '@chiamine/bls-signatures';
import { bip39 } from './bip39';

const loadBls = asyncLoadBls();

const generatePrivateKey = async (seed?: string): Promise<PrivateKey> => {
    const BLS = await loadBls;

    if (seed) {
        return BLS.AugSchemeMPL.key_gen(Buffer.from(seed, 'hex'));
    }

    const mnemonic = bip39.generateMnemonic();
    const newSeed = await bip39.mnemonicToSeed(mnemonic);

    return BLS.AugSchemeMPL.key_gen(Buffer.from(newSeed, 'hex'));
};

const generatePublicKey = (privateKey: PrivateKey): G1Element => privateKey.get_g1();

const sign = async (privateKey: PrivateKey, message: string): Promise<G2Element> => {
    const BLS = await loadBls;
    const signature = BLS.AugSchemeMPL.sign(privateKey, Buffer.from(message, 'hex'));

    return signature;
};

const verify = async (publicKey: G1Element, signature: G2Element, message: string): Promise<boolean> => {
    const BLS = await loadBls;

    return BLS.AugSchemeMPL.verify(publicKey, Buffer.from(message, 'hex'), signature);
};

const aggregate = async (signatures: G2Element[]): Promise<G2Element> => {
    const BLS = await loadBls;
    const aggregateSignature = await BLS.AugSchemeMPL.aggregate(signatures);

    return aggregateSignature;
};

const aggregateVerify = async (publicKeys: G1Element[], messages: string[], aggregateSignature: G2Element): Promise<boolean> => {
    const BLS = await loadBls;

    return BLS.AugSchemeMPL.aggregate_verify(publicKeys, messages.map(message => Buffer.from(message, 'hex')), aggregateSignature);
};

export const bls = {
    generatePrivateKey,
    generatePublicKey,
    sign,
    verify,
    aggregate,
    aggregateVerify
};
