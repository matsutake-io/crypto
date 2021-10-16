import { bech32m } from 'bech32';

const convertbits = (data: number[], frombits: number, tobits: number, pad: boolean = true) => {
    let acc = 0;
    let bits = 0;
    const ret = [];
    const maxv = (1 << tobits) - 1;
    const max_acc = (1 << (frombits + tobits - 1)) - 1;

    for (const value of data) {
        if (value < 0 || (value >> frombits)) {
            return null;
        }

        acc = ((acc << frombits) | value) & max_acc;
        bits += frombits;

        while (bits >= tobits) {
            bits -= tobits;

            ret.push((acc >> bits) & maxv);
        }
    }

    if (pad) {
        if (bits) {
            ret.push((acc << (tobits - bits)) & maxv);
        }
    } else if (bits >= frombits || ((acc << (tobits - bits)) & maxv)) {
        return null;
    }

    return ret;
};

const fromHash = (prefix: string, hash: string): string => {
    if (hash.length !== 64 && hash.length !== 66) {
        throw new Error('Hash is incorrect length to be converted to address');
    }

    const data = convertbits(
        Array.prototype.slice.call(
            Buffer.from(
                hash.length === 66 ?
                hash.slice(2) :
                hash,
                'hex'
            ),
            0
        ), 8, 5
    );

    if (!data) {
        throw new Error('Hash could not be converted to address');
    }

    return bech32m.encode(prefix, data);
};

const toHash = (address: string) => {
    const data = convertbits(bech32m.decode(address).words, 5, 8, false);

    if (!data) {
        throw new Error('Address could not be converted to hash');
    }

    return Buffer.from(data).toString('hex');
};

export const address = {
    fromHash,
    toHash
};
