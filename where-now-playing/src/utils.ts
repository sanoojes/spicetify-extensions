export function waitForElement<T extends Element>(
  selector: string,
  parent = document.body,
): Promise<T> {
  return new Promise((resolve) => {
    const elm = parent.querySelector<T>(selector);
    if (elm) {
      return resolve(elm);
    }

    const observer = new MutationObserver((_) => {
      const elm = parent.querySelector<T>(selector);
      if (elm) {
        observer.disconnect();
        resolve(elm);
      }
    });

    observer.observe(parent, {
      childList: true,
      subtree: true,
    });
  });
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
