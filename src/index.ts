import dotenv from 'dotenv';
dotenv.config();

import { spawn, Worker, Thread } from 'threads';

// (async () => {
//     (await spawn(new Worker('./discord/discordClient.ts'))).initialise();
// })()

import initialise from './discord/discordClient';
initialise();