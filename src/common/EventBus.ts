const eventBus = {
  on(event: string, callback: EventListener) {
    document.addEventListener(event, (e) => callback(e));
  },
  dispatch(event: string, data?: any) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event: string, callback: EventListener) {
    document.removeEventListener(event, callback);
  },
};
  
export default eventBus;



/*

const eventBus = {
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;

*/