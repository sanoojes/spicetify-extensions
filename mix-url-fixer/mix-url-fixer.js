(async () => {
  while (!Spicetify?.React) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log("[mix-url-fixer] am alive");

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
      ".main-gridContainer-gridContainer img, .main-entityHeader-image img, .main-yourLibraryX-listItem .x-entityImage-imageContainer img, .view-homeShortcutsGrid-imageContainer img,.main-home-content section img"
    );
    const pattern = /\/daily\/(\d+)\/([a-f0-9]{40})/;

    const updatePromises = Array.from(images).map(async (img) => {
      const src = img.src;
      const match = src.match(pattern);

      if (match) {
        img.style.transition = "filter 0.3s ease, opacity 0.3s ease";
        img.style.filter = "blur(8px)";
        img.style.opacity = 0.5;

        return new Promise((resolve) => {
          const number = match[1];
          const uid = match[2];
          const newSrc = `https://dailymix-images.scdn.co/v2/img/${uid}/${number}/en/default`;

          const newImg = new Image();
          newImg.onload = () => {
            img.src = newSrc;
            img.srcset = newSrc;
            img.style.filter = "none";
            img.style.opacity = 1;
            resolve();
          };
          newImg.onerror = (error) => {
            console.error("[mix-url-fixer] Failed to load new image:", error);
            img.style.filter = "none";
            img.style.opacity = 1;
            resolve();
          };
          newImg.src = newSrc;
        });
      }
      return Promise.resolve();
    });

    await Promise.all(updatePromises);
    console.log("[mix-url-fixer] All image updates complete");
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
      console.log("[mix-url-fixer] Disconnected the previous observer.");
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
    observeImages(".Root__main-view, .Root__nav-bar");
  }, 1000);
})();
