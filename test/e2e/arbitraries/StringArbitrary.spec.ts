import * as assert from 'power-assert';
import * as sc from '../../../src/check/simple-check'

const seed = Date.now();
describe(`StringArbitrary (seed: ${seed})`, () => {
    describe('base64String', () => {
        it('Should shrink on base64 containing no equal signs', () => {
            const out = sc.check(sc.property(sc.base64String(), (s:string) => /^\w*$/.exec(s) == null), {seed: seed});
            assert.ok(out.failed, 'Should have failed');
            assert.equal(out.counterexample, "", 'Should shrink to counterexample ""');
        });
        it('Should shrink on base64 containing one equal signs', () => {
            const out = sc.check(sc.property(sc.base64String(), (s:string) => /^\w+=$/.exec(s) == null), {seed: seed});
            assert.ok(out.failed, 'Should have failed');
            assert.equal(out.counterexample, "AAA=", 'Should shrink to counterexample "AAA="');
        });
        it('Should shrink on base64 containing two equal signs', () => {
            const out = sc.check(sc.property(sc.base64String(), (s:string) => /^\w+==$/.exec(s) == null), {seed: seed});
            assert.ok(out.failed, 'Should have failed');
            assert.equal(out.counterexample, "AA==", 'Should shrink to counterexample "AA=="');
        });
    });
});
