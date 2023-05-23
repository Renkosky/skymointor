const handelError = (e: any) => {};

const originAddEventListener = EventTarget.prototype.addEventListener;

EventTarget.prototype.addEventListener = (
  type: string,
  listener: EventListenerOrEventListenerObject,
  options: any
) => {
  const wrappedListener = (...args: any) => {
    //
    try {
      if (typeof listener === 'function') {
        // 如果 listener 是一个函数
        return listener.apply(window, args);
      } else if (listener && typeof listener.handleEvent === 'function') {
        // 如果 listener 是一个对象，且包含 handleEvent 方法
        return listener.handleEvent.apply(listener, args);
      }
    } catch (error) {
      throw error;
    }
  };
};

window.onerror = (msg, url, lineNum, e) => {
  handelError(e);
};

window.onunhandledrejection = function(event) {
  console.log('Unhandled promise rejection:', event.promise);
  console.log('Promise rejection reason:', event.reason);
  if (typeof event === 'object' && event !== null && !Array.isArray(event)) {
  } else {
  }
};
