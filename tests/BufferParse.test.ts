import { performance } from 'perf_hooks';
import { Buffer } from '../functions/Buffer.js';

const data = [198,1,3,0,199,2,139,125,0,0,40,2,2,0,0,0,233,0,1,0,32,0,133,3,85,39,0,0,238,6,0,0,0,0,199,2,139,125,0,0,8,0,0,0,0,0,0,0,0,0,255,2,0,0,0,0,237,2,0,0,0,0,216,2,5,0,0,0,236,2,4,0,0,0,215,2,14,0,0,0,175,2,1,0,110,19,0,1,0,121,170,0,1,0,121,166,1,1,0,110,241,6,0,0,112,65,3,7,0,67,3,0,0,0,0,68,3,0,0,0,0,89,2,0,0,0,0,253,3,101,0,0,0,179,2,6,29,0,0,72,4,4,0,0,0,214,2,28,0,0,0,245,6,0,0,0,0,153,2,0,0,0,0,152,2,0,0,0,0,191,6,50,0,0,0,156,6,0,155,6,0,0,3,12,0,71,114,121,111,122,115,83,101,114,118,101,114,164,1,10,0,67,84,70,32,67,117,115,116,111,109,178,2,2,6,0,0,70,2,2,0,0,0,0,0,0,0];

const expectedResult = `{"01C6":{"02C7":[139,125,0,0],"0228":[2,0,0,0],"00E9":[{"0385":[85,39,0,0],"06EE":[0,0,0,0],"02C7":[139,125,0,0],"0008":[0,0,0,0,0,0,0,0],"02FF":[0,0,0,0],"02ED":[0,0,0,0],"02D8":[5,0,0,0],"02EC":[4,0,0,0],"02D7":[14,0,0,0],"02AF":[110],"0013":[121],"00AA":[121],"01A6":[110],"06F1":[0,0,112,65],"0703":[0],"0343":[0,0,0,0],"0344":[0,0,0,0],"0259":[0,0,0,0],"03FD":[101,0,0,0],"02B3":[6,29,0,0],"0448":[4,0,0,0],"02D6":[28,0,0,0],"06F5":[0,0,0,0],"0299":[0,0,0,0],"0298":[0,0,0,0],"06BF":[50,0,0,0],"069C":[0],"069B":[0],"0300":[71,114,121,111,122,115,83,101,114,118,101,114],"01A4":[67,84,70,32,67,117,115,116,111,109],"02B2":[2,6,0,0],"0246":[2,0,0,0,0,0,0,0]}]}}`;

// <Test>
const buffer = new Buffer(Uint8Array.from(data));

const startTime = performance.now();
const output = await buffer.parse();
const endTime = performance.now();

const remainder = buffer.clone();
// </Test>

if (!output) {
	throw new Error('Output is null.');
}

if (remainder.length > 0) {
	throw new Error(`Not all bytes were processed. ${remainder.length} bytes remain.`);
}

if (JSON.stringify(output) !== expectedResult) {
	throw new Error('Output value is incorrect.');
}

console.log(`Passed in ${(endTime - startTime).toFixed(3)}ms.`);
