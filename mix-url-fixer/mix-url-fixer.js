(async () => {
  while (!Spicetify?.React) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log("am alive");

  function debounce(func, delay) {
    let timeout;
    return async (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        await func(...args);
      }, delay);
    };
  }

  async function updateImageLinks() {
    const images = document.querySelectorAll(
      ".main-gridContainer-gridContainer img, .main-entityHeader-image img"
    );
    const pattern = /\/daily\/(\d+)\/([a-f0-9]{40})/;

    for (const img of images) {
      const src = img.src;

      console.debug("Checking image src:", src);

      const match = src.match(pattern);

      if (match) {
        const number = match[1];
        const uid = match[2];

        const newSrc = `https://dailymix-images.scdn.co/v2/img/${uid}/${number}/en/default`;

        img.src = newSrc;
        img.srcset = newSrc;
        console.debug(`Updated image src to: ${newSrc}`);
      }
    }
  }

  const debouncedUpdate = debounce(async () => {
    await updateImageLinks();
  }, 300);

  let observer;

  function observeImages(divId) {
    const targetNodes = document.querySelectorAll(divId);

    if (!targetNodes.length) return;

    if (observer) {
      observer.disconnect();
      console.log("Disconnected the previous observer.");
    }

    observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "src"
        ) {
          debouncedUpdate();
        }
      }
    });

    const config = {
      attributes: true,
      attributeFilter: ["src"],
      subtree: true,
    };

    for (const node of targetNodes) {
      observer.observe(node, config);
    }
  }

  setTimeout(() => {
    observeImages(".Root__main-view");
  }, 1000);
})();
