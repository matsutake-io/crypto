import { address } from './address';

describe('address', () => {
    describe('fromHash', () => {
        it('converts a hash without 0x prefix to an address', () => {
            const result = address.fromHash('xch', '6f184a7074c925ef8688ce56941eb8929be320265f824ec7e351356cc745d38a');
    
            expect(result).toBe('xch1duvy5ur5eyj7lp5geetfg84cj2d7xgpxt7pya3lr2y6ke3696w9qvda66e');
        });
    
        it('converts a hash with 0x prefix to an address', () => {
            const result = address.fromHash('xch', '0x6f184a7074c925ef8688ce56941eb8929be320265f824ec7e351356cc745d38a');
    
            expect(result).toBe('xch1duvy5ur5eyj7lp5geetfg84cj2d7xgpxt7pya3lr2y6ke3696w9qvda66e');
        });
    
        it('throws error if hash is wrong length', () => {
            expect(() => address.fromHash('xch', 'mojo')).toThrow(new Error('Hash is incorrect length to be converted to address'));
        });
    });
   
    describe('toHash', () => {
        it('converts an address to a hash', () => {
            const result = address.toHash('xch1duvy5ur5eyj7lp5geetfg84cj2d7xgpxt7pya3lr2y6ke3696w9qvda66e');

            expect(result).toBe('6f184a7074c925ef8688ce56941eb8929be320265f824ec7e351356cc745d38a');
        });

        it('throws error if address is wrong length', () => {
            expect(() => address.toHash('mojo')).toThrow(new Error('mojo too short'));
        });
    });
});
