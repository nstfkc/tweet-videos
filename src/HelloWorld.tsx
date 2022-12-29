import { PropsWithChildren } from 'react';
import { Audio, Img, Series, spring, staticFile, Video } from 'remotion';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Logo } from './HelloWorld/Logo';
import { Subtitle } from './HelloWorld/Subtitle';
import { Title } from './HelloWorld/Title';

import {
  HiOutlineEllipsisHorizontal,
  HiOutlineEllipsisVertical,
} from 'react-icons/hi2';

type TweetProps = {
  username: string;
  name: string;
  profileImage: string;
};

function parseImages(entities: ThreadItem['entities'] = {} as any) {
  const output: { url: string; width: number; height: number }[] = [];
  if (entities.urls) {
    const imageList = entities.urls
      .filter((entity) => Boolean(entity.images))
      .map((entity) => entity.images);
    const { height, url, width } = imageList[0]?.[0] ?? {};
    if (height && url && width) {
      output.push({
        url,
        height,
        width,
      });
    }
  }
  return output;
}

const Tweet = (props: PropsWithChildren<TweetProps>) => {
  const { username, name, profileImage, children } = props;

  return (
    <div>
      <div
        className="bg-slate-800/80 text-white/80 rounded-xl p-8"
        style={{
          position: 'absolute',
          left: 'calc(50% - 450px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '900px',
        }}
      >
        <div className="flex">
          <div className="w-[96px] min-w-[96px]">
            <Img
              className="w-[72px] h-[72px] rounded-full"
              src={profileImage}
            />
          </div>
          <div className="flex flex-col gap-4 grow-0">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="font-bold text-4xl">{name}</div>
                <div className="text-3xl opacity-75">@{username}</div>
              </div>
              <div>
                <HiOutlineEllipsisVertical size="48" />
              </div>
            </div>
            <div className="text-3xl">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LinePad = () => <div style={{ height: '24px' }} />;

type ThreadItem = {
  id: string;
  originalText: string;
  lines: string[];
  linesForAudio: string[];
  entities: {
    urls: {
      start: number;
      end: number;
      url: string;
      expanded_url: string;
      display_url: string;
      images?: {
        url: string;
        width: number;
        height: number;
      }[];
      status?: number;
      title?: string;
      description?: string;
      unwound_url?: string;
    }[];
  };
};

export interface ThreadData {
  id: string;
  user: {
    username: string;
    avatarUrl: string;
    name: string;
    bio: string;
  };
  thread: ThreadItem[];
}

interface HelloWorldProps {
  data: ThreadData;
  durations: Record<string, number>;
}

export const HelloWorld = (props: HelloWorldProps) => {
  const { data, durations } = props;

  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <Audio loop src={staticFile('up.mp3')} volume={0.1} />
      <Series>
        {data.thread.map((tweet) => {
          return (
            <Series.Sequence
              key={tweet.id}
              durationInFrames={Math.ceil(durations[tweet.id]) * fps}
            >
              <Audio src={staticFile(`${data.id}/audio/${tweet.id}.mp3`)} />
              <Tweet
                name={data.user.name}
                profileImage={data.user.avatarUrl}
                username={data.user.username}
              >
                <div className="flex flex-col gap-4">
                  {tweet.lines.map((text, idx) => (
                    <div key={idx}>{text}</div>
                  ))}
                </div>
                {parseImages(tweet.entities).map(({ height, url, width }) => {
                  return (
                    <div className="py-4">
                      <Img
                        src={url}
                        style={{
                          aspectRatio: width / height,
                        }}
                        className="w-full"
                      />
                    </div>
                  );
                })}
              </Tweet>
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};
