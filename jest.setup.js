import 'whatwg-fetch'; // ✅ Adds global.fetch for Jest
import { TextEncoder, TextDecoder } from 'util';

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

