import { aggregateSignatures, utils, getPublicKey, sign as blsSign, verify as blsVerify, verifyBatch } from 'noble-bls12-381';

const generatePrivateKey = (): string => Buffer.from(utils.randomPrivateKey()).toString('hex');

const generatePublicKey = (privateKey: string): string => Buffer.from(getPublicKey(privateKey)).toString();

const sign = async (privateKey: string, message: string): Promise<string> => blsSign(message, privateKey)

const verify = async (publicKey: string, signature: string, message: string): Promise<boolean> => blsVerify(signature, message, publicKey);

const aggregate = async (signatures: string[]): Promise<string> => Buffer.from(aggregateSignatures(signatures)).toString();

const aggregateVerify = async (publicKeys: string[], messages: string[], aggregateSignature: string): Promise<boolean> => verifyBatch(aggregateSignature, messages, publicKeys);

export const bls = {
    generatePrivateKey,
    generatePublicKey,
    sign,
    verify,
    aggregate,
    aggregateVerify
};
