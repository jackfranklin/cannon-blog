import { jsdom } from 'jsdom';

export default function(markup = '') {
  global.document = jsdom(markup);
  global.window = document.parentWindow;

}
