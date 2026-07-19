import { waitForElement } from "@/utils.ts";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  while (!Spicetify?.Player?.data || !Spicetify?.Platform?.History) {
    await sleep(250);
  }

  function onNavigate(ev: MouseEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    ev.stopImmediatePropagation();

    const { data } = Spicetify.Player;
    if (!data?.context?.uri || !data?.item) return;

    const [, type, id, subType] = data.context.uri.split(":");
    let pathname = `/${type}/${id}`;

    const searchParams = new URLSearchParams({
      uid: data.item.uid,
      uri: data.item.uri,
    });

    if (type === "list") {
      const coverButton = document.querySelector<HTMLAnchorElement>(
        ".main-nowPlayingView-coverArtVisualEnhancement a[aria-label^='Now playing']",
      );

      const preservedPath = coverButton?.getAttribute("data-href");

      if (preservedPath) {
        const parsedUrl = new URL(preservedPath, window.location.origin);
        pathname = parsedUrl.pathname;

        parsedUrl.searchParams.forEach((value, key) => {
          searchParams.set(key, value);
        });
      }
    } else if (type === "user" && subType === "collection") {
      pathname = "/collection/tracks";
    }

    const search = `?${searchParams.toString()}`;
    console.log("Navigating to:", pathname, "with search:", search);

    Spicetify.Platform.History.push({
      pathname,
      search: search,
    });
    // console.log(`Spicetify.Platform.History.push({pathname:"${pathname}",search:"${search}"})`)
  }

  const playingBar = await waitForElement<HTMLDivElement>(
    ".Root__right-sidebar, #Desktop_PanelContainer_Id",
  );

  let lastCoverButton: HTMLAnchorElement | null = null;
  let lastCanvasContainer: HTMLDivElement | null = null;

  function hookElements() {
    const coverButton = playingBar.querySelector<HTMLAnchorElement>(
      ".main-nowPlayingView-coverArtVisualEnhancement a[aria-label^='Now playing']",
    );

    if (coverButton !== lastCoverButton) {
      if (lastCoverButton) {
        lastCoverButton.removeEventListener("click", onNavigate, true);
      }

      lastCoverButton = coverButton;

      if (coverButton) {
        if (coverButton.hasAttribute("href")) {
          coverButton.setAttribute("data-href", coverButton.getAttribute("href")!);
          coverButton.removeAttribute("href");
          coverButton.style.cursor = "pointer";
        }
        coverButton.addEventListener("click", onNavigate, true);
      }
    }

    const canvasContainer = playingBar.querySelector<HTMLDivElement>(".canvasVideoContainerNPV");

    if (canvasContainer !== lastCanvasContainer) {
      if (lastCanvasContainer) {
        lastCanvasContainer.removeEventListener("dblclick", onNavigate, true);
      }

      lastCanvasContainer = canvasContainer;

      if (canvasContainer) {
        canvasContainer.style.cursor = "pointer";
        canvasContainer.addEventListener("dblclick", onNavigate, true);
      }
    }
  }

  const observer = new MutationObserver(hookElements);

  observer.observe(playingBar, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href", "class"],
  });

  hookElements();
}

main()
