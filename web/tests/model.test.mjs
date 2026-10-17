import {test} from 'node:test';
import assert from 'node:assert/strict';
import {trim,frame,placement,recordingType} from '../model.mjs';
test('trim never leaves the source, including reversed and negative bounds',()=>{
 for(const [a,b,d] of [[-5,20,8],[9,2,8],[3,2,8],[0,1,0.01]]){
   const r=trim(a,b,d);assert.ok(r.start>=0);assert.ok(r.end<=d);assert.ok(r.end>r.start);
 }
 assert.throws(()=>trim(NaN,4,8));assert.throws(()=>trim(0,4,Infinity));
});
test('preserve image and center crop have the intended geometry',()=>{
 assert.deepEqual(placement(1920,1080,720,1280,'contain'),[0,437.5,720,405]);
 const [x,y,w,h]=placement(1920,1080,720,1280,'cover');
 assert.ok(x<0);assert.equal(y,0);assert.equal(h,1280);assert.ok(w>720);
 assert.deepEqual(frame('9:16'),[720,1280]);
});
test('codec selection only returns a supported format',()=>{
 assert.equal(recordingType({isTypeSupported:t=>t==='video/webm'}),'video/webm');
 assert.equal(recordingType({isTypeSupported:()=>false}),undefined);
});
