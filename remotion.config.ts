// All configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli
// ! The configuration file does only apply if you render via the CLI !

import { Config } from 'remotion';
import { enableTailwind } from './src/enable-tailwind';

Config.Output.setOverwriteOutput(true);
Config.Bundling.overrideWebpackConfig(enableTailwind);

Config.Rendering.setImageFormat('png');
Config.Output.setPixelFormat('yuva444p10le');
Config.Output.setCodec('prores');
Config.Output.setProResProfile('4444');
