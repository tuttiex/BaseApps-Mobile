import 'react-native-get-random-values';
import { TextEncoder, TextDecoder } from 'text-encoding-polyfill';
import { Buffer } from 'buffer';

if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = TextDecoder as any;
}

if (typeof global.Buffer === 'undefined') {
    global.Buffer = Buffer;
}
