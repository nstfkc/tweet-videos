import { Composition } from 'remotion';
import './style.css';

import { HelloWorld, ThreadData } from './HelloWorld';
import data1596141726606848000 from '../public/1596141726606848000/data.json';
import data1597236378185699335 from '../public/1597236378185699335/data.json';
import data1596921348491972608 from '../public/1596921348491972608/data.json';
import data40 from '../public/1596636166807511040/data.json';

import durations1596141726606848000 from '../public/1596141726606848000/audio/durations.json';
import durations1597236378185699335 from '../public/1597236378185699335/audio/durations.json';
import durations40 from '../public/1596636166807511040/audio/durations.json';
import durations1596921348491972608 from '../public/1596921348491972608/audio/durations.json';

function calculateTotalLength(
  durations: Record<string, number>,
  offset = 1,
  pad = 1,
  fps = 30
) {
  let total = 0;
  for (const duration in durations) {
    total += Math.ceil(durations[duration]) * fps + pad * fps;
  }
  return total + offset * fps;
}

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={data1596141726606848000.id}
        component={HelloWorld}
        durationInFrames={calculateTotalLength(durations1596141726606848000)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          data: data1596141726606848000 as ThreadData,
          durations: durations1596141726606848000,
        }}
      />
      <Composition
        id={data1597236378185699335.id}
        component={HelloWorld}
        durationInFrames={calculateTotalLength(durations1597236378185699335)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          data: data1597236378185699335 as ThreadData,
          durations: durations1597236378185699335,
        }}
      />
      <Composition
        id={data40.id}
        component={HelloWorld}
        durationInFrames={calculateTotalLength(durations40)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          data: data40 as ThreadData,
          durations: durations40,
        }}
      />
      <Composition
        id={data1596921348491972608.id}
        component={HelloWorld}
        durationInFrames={calculateTotalLength(durations1596921348491972608)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          data: data1596921348491972608 as ThreadData,
          durations: durations1596921348491972608,
        }}
      />
    </>
  );
};
