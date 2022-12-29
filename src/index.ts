// This is your entry file! Refer to it when you render:
// npx remotion render <entry-file> HelloWorld out/video.mp4

import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

registerRoot(RemotionRoot);

// ffmpeg -i out/1596921348491972608.webm -i bg4scaled.mp4 -filter_complex \
// "[1:0]setdar=dar=1,format=rgba[a]; \
//  [0:0]setdar=dar=1,format=rgba[b]; \
//  [b][a]blend=all_mode='overlay':all_opacity=0.8" \
// blended.mp4

/*
 ffmpeg -i vid00.mp4 -i img00.png -i img00.png
 -filter_complex "[0:v][1:v]overlay=0:0:enable='between(t, 1,  2)'[v0];
 [v0][2:v]overlay=0:0:enable='between(t,   3,  4)'"
 -c:v libx264 -preset ultrafast -qp 20  -c:a copy -y vid01.mp4


 ffmpeg \
    -i bg4scaled.mp4 -x264opts colormatrix=bt709 \
    -i overlay.mov -x264opts colormatrix=bt709 \
    -filter_complex " \
        [0:v]setpts=PTS-STARTPTS, scale=1920x1080[top]; \
        [1:v]setpts=PTS-STARTPTS, scale=1920x1080, \
             colorchannelmixer=aa=1.0[bottom]; \
        [top][bottom]overlay=shortest=1" \
    -vcodec libx264 -qp 15 -an -shortest blend.mov

ffmpeg -stream_loop 3 -i bg4scaled.mp4 -i overlay.mov -filter_complex "[0:v][1:v]overlay;[1:a]amix"  blended.mp4
*/
