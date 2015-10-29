import {default as equals} from 'equals';

export default function applyUpdaters(opts, prevOpts, updaters, tag) {
  Object.keys(updaters).forEach((updaterName) => {
    const opt = opts[updaterName];
    const prevOpt = prevOpts[updaterName];
    const updater = updaters[updaterName];
    
    if(!equals(opt, prevOpt)) {
      updater(opt, tag);
    }
  });
}