import { waitForElement,sleep } from "@/utils.ts";

const PLAYING_BAR = ".Root__right-sidebar, #Desktop_PanelContainer_Id";
const COVER_BUTTON = ".main-nowPlayingView-coverArtVisualEnhancement a[aria-label^='Now playing'], main-nowPlayingView-coverArtContainer a[data-testid='context-link']";
const CANVAS_CONTAINER = ".canvasVideoContainerNPV";
const WIDGET_COVER = ".Root__now-playing-bar .main-nowPlayingWidget-coverArtContainer";

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
      const coverButton = document.querySelector(COVER_BUTTON);
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
  }

  await waitForElement<HTMLDivElement>(PLAYING_BAR);

  let lastCoverButton: HTMLAnchorElement | null = null;
  let lastCanvasContainer: HTMLDivElement | null = null;
  let lastWidgetCover: HTMLButtonElement | null = null;

  function hookElements() {
    const coverButton = document.querySelector<HTMLAnchorElement>(COVER_BUTTON);
    if (coverButton !== lastCoverButton) {
      if (lastCoverButton) {
        lastCoverButton.removeEventListener("click", onNavigate, true);
      }
      lastCoverButton = coverButton;
      if (coverButton) {
        coverButton.addEventListener("click", onNavigate, true);
      }
    }

    if (coverButton && coverButton.hasAttribute("href")) {
      coverButton.setAttribute("data-href", coverButton.getAttribute("href")!);
      coverButton.removeAttribute("href");
      coverButton.style.cursor = "pointer";
    }

    const canvasContainer = document.querySelector<HTMLDivElement>(CANVAS_CONTAINER);
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

    const widgetCover = document.querySelector<HTMLButtonElement>(WIDGET_COVER);
    if (widgetCover !== lastWidgetCover) {
      if (lastWidgetCover) {
        lastWidgetCover.removeEventListener("dblclick", onNavigate, true);
      }
      lastWidgetCover = widgetCover;
      if (widgetCover) {
        widgetCover.style.cursor = "pointer";
        widgetCover.addEventListener("dblclick", onNavigate, true);
      }
    }
  }

  const observer = new MutationObserver(hookElements);

 const appRoot = document.querySelector(".Root") || document.body;
  observer.observe(appRoot, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href", "class"],
  });

  Spicetify.Player.addEventListener("songchange", (e) => {
    setTimeout(hookElements, 100);
  });

  hookElements();
}

main();