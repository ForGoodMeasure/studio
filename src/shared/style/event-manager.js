const POLL_INTERVAL = 100;
let instance;

class EventManager {

  constructor() {
    this.events = [];
    this.count = 100;
    this.started = false;
    this.previousScrollPos = 0;
  }

  startLoop() {
    window.setInterval(this.processEvents.bind(this), POLL_INTERVAL)
  }

  addEvent(fn) {
    const uuid = String(this.count);
    this.count ++;
    this.events.push({
      uuid,
      fn
    });
    if (!this.started) {
      this.startLoop();
    }
    return uuid;
  }

  removeEvent(uuid) {
    this.events = this.events.filter(e => e.uuid !== uuid);
  }

  processEvents() {
    this.isIdle = this.previousScrollPos === window.scrollY;
    this.events.forEach(e => {
      if (!this.isIdle) {
        e.fn();
      }
    })
    this.previousScrollPos = window.scrollY;
  }
}

export function getEventManagerInstance() {
  instance = instance || new EventManager();
  return instance;
}
