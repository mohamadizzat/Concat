// SPDX-License-Identifier: AGPL-3.0-or-later
export function trim(start,end,duration) {
  if (![start,end,duration].every(Number.isFinite) || duration<=0) throw new Error('Duração de vídeo inválida.');
  const minimum=Math.min(0.05,duration);
  const from=Math.max(0,Math.min(start,duration-minimum));
  return {start:from,end:Math.max(from+minimum,Math.min(end,duration))};
}
export function frame(ratio) { return ratio==='16:9'?[1280,720]:ratio==='1:1'?[720,720]:[720,1280]; }
export function placement(sw,sh,dw,dh,fit) {
  const scale=fit==='cover'?Math.max(dw/sw,dh/sh):Math.min(dw/sw,dh/sh);
  return [(dw-sw*scale)/2,(dh-sh*scale)/2,sw*scale,sh*scale];
}
export function recordingType(recorder) {
  return ['video/mp4;codecs=avc1.42E01E,mp4a.40.2','video/webm;codecs=vp8,opus','video/webm'].find(type=>recorder.isTypeSupported(type));
}
