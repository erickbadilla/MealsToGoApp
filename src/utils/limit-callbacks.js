export const debounce = (callback, delay = 1000) => {
  let timeout = null;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export const throttle = (callback, delay = 1000) => {
  let shouldWait = false;
  let waitingArgs = null;

  const timeoutCallback = () => {
    if (!waitingArgs) {
      shouldWait = false;
      return;
    }

    callback(...waitingArgs);
    waitingArgs = null;
    setTimeout(timeoutCallback, delay);
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    callback(...args);
    shouldWait = true;

    setTimeout(timeoutCallback, delay);
  };
};
