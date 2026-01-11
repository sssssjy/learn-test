// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import 'whatwg-fetch';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
class BroadcastChannelMock {
  constructor() {}
  postMessage() {}
  close() {}
  addEventListener() {}
  removeEventListener() {}
}

global.BroadcastChannel = BroadcastChannelMock;

if (
  typeof global.ReadableStream === 'undefined' ||
  typeof global.WritableStream === 'undefined' ||
  typeof global.TransformStream === 'undefined'
) {
  // Node 官方实现（最稳）
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webStreams = require('stream/web');

  global.ReadableStream = webStreams.ReadableStream;
  global.WritableStream = webStreams.WritableStream;
  global.TransformStream = webStreams.TransformStream;
}