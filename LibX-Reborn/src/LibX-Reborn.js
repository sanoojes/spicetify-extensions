const CONFIG = {
  defaultGap: 8,
  globalNavSelector: ".Root__globalNav",
  libXClass: "global-libraryX",
  stylesheetId: "libraryX-styles",
};

const CUSTOM_CSS = `
.Root__top-container,
:root .global-nav .Root__top-container,
.spotify__container--is-desktop .global-nav .Root__top-container {
  padding-top: 64px !important;
  grid-template-areas:
    "global-nav main-view right-sidebar"
    "left-sidebar main-view right-sidebar"
    "now-playing-bar now-playing-bar now-playing-bar" !important;
  grid-template-rows: auto 1fr auto !important;
}
.Root__globalNav,
.Root__globalNav.VWGwIHKvvfu0ry5ZqbxU{
  grid-area: global-nav !important;
}

.Root__globalNav .main-globalNav-historyButtonsContainer,
.Root__globalNav .main-globalNav-searchSection,
.Root__globalNav .main-topBar-topbarContentRight {
  padding: 0 .25rem !important;
  -webkit-transform: none !important;
  transform: none !important;
}

.Root__globalNav .ppjvheuqvs8mmcHwKkK5{
  padding: 4px 0px 0px !important;
  margin-inline: 0 !important;
}

.Root__globalNav .DoxYADBBjYMvoYwl7QPg{
  margin-inline: 0 !important;
}
.Root__globalNav .custom-navlinks-scrollable_container div[role="presentation"] {
  flex-direction: column;
  width: 100%;
}

.spotify__container--is-desktop.spotify__os--is-macos .Root__globalNav,
.spotify__container--is-desktop.spotify__os--is-windows .Root__globalNav,
.Root__globalNav {
  padding-block: 0 !important;
  padding-inline: 0 !important;
  padding-block-end: 0 !important;
  padding-block-start: 0 !important;
  padding: 0.25rem !important;
}
.main-globalNav-link-icon .Wrapper-medium-only {
  margin-left: 0.25rem;
}
.Root__globalNav {
  --library-bg-color: var(--background-base, var(--spice-main));
  height: unset;
  width: 100%;
  background-color: var(--library-bg-color);
  border-radius: 8px;
  padding-inline: unset !important;
  align-items: unset;
  padding: 8px;
  z-index: var(--above-everything-except-now-playing-bar-z-index, 5);
  margin: 0 !important;
}

.Root__globalNav .main-globalNav-navLink,
.Root__globalNav .main-globalNav-link-icon {
  background-color: unset;
  transform: unset;
  justify-content: unset;
  height: 3.25rem;
  max-height: 3.25rem;
  border: none !important;
  margin-inline: 0 !important;
}
.Root__globalNav .main-globalNav-navLink{
  padding: 1rem 1rem 1rem 1.25rem;
}

.Root__nav-bar .LayoutResizer__resize-bar {
  height: 82vh;
  bottom: 0;
}

.main-actionButtons {
  display: inline-flex !important;
  animation: unset !important;
}

.main-globalNav-historyButtons > * {
  display: unset;
}

.main-globalNav-historyButtons {
  order: 1;
  display: unset;
  position: absolute;
  bottom: 8px;
  right: 8px;
}

.main-globalNav-historyButtonsContainer {
  display: grid;
  order: 0;
  z-index: -1;
}

.main-globalNav-searchSection {
  order: -1;
}

.Root__globalNav .Dp3xccI7c2f_JSJ8OHYu {
  margin-inline-start: unset;
}

.Root__globalNav,
.main-globalNav-searchContainer,
.aKOZdeebnsaeeMTiugmO {
  flex-direction: column !important;
}

.SFAoASy0S_LZJmYZ3Fh9 {
  background: unset;
  background-color: unset !important;
  border-bottom: unset;
}

.main-topBar-topbarContentRight {
  justify-content: unset;
}

.main-globalNav-iconText:not(.main-globalNav-link-icon) {
  font-size: 1rem;
  font-weight: 700;
  margin-inline-start: 0.5rem;
}

.main-globalNav-historyButtons,
.Root__globalNav .main-topBar-topbarContentRight {
  position: fixed !important;
  display: flex !important;
  top: 0;
  padding: 0.5rem !important;
  height: max-content;
  width: max-content;
}

._b3hhmbWtOY8_1M1mM1H {
  margin-inline: 0;
}

.zugTpa7GhjPIQmTCgBzw,
.main-globalNav-searchInputSection {
  position: fixed;
  top: 0.5rem;
  max-width: 25vw;
  margin-inline: unset;
}

.Root__globalNav .main-globalNav-historyButtons {
  top: 0 !important;
  left: var(--history-button-left, var(--panel-gap, 0.5rem)) !important;
}

.Root__globalNav .fmZ0hU6ImbDQi5qGWLvF,
.Root__globalNav .main-globalNav-searchContainer > span:nth-child(2),
.Root__globalNav .main-globalNav-searchContainer > span[role="presentation"],
.Root__globalNav .main-globalNav-searchContainer > .zugTpa7GhjPIQmTCgBzw,
.Root__globalNav .main-globalNav-searchContainer .main-globalNav-searchInputSection,
.Root__globalNav .main-globalNav-searchContainer > form,
.Root__globalNav ._b3hhmbWtOY8_1M1mM1H > form {
  position: fixed;
  top: var(--search-container-top, var(--panel-gap, 0.5rem)) !important;
  left: var(--search-container-left, var(--panel-gap, 0.5rem)) !important;
  width: 22rem;
  max-width: 25vw;
  height: fit-content;
}

.Root__globalNav .main-topBar-topbarContentRight {
  right: 0.5rem;
}

.spotify__container--is-desktop.spotify__os--is-windows .Root__globalNav .main-topBar-topbarContentRight {
  right: 10vw;
}

.main-globalNav-navLinkActive {
  background-color: rgba(var(--spice-rgb-selected-row), 0.1) !important;
  border-radius: 0.5rem !important;
}

#main:has(.oZT8iKL42zhLAm_zE5F5) .main-globalNav-textWrapper {
  display: none;
}

.Root__globalNav {
  display: flex;
  overflow: hidden;
  --card-gap: 0.25rem;
}

.custom-navlinks-scrollable_container {
  -webkit-app-region: no-drag;
  max-width: 100% !important;
  width: 100% !important;
}

.Root__globalNav .main-globalNav-searchContainer,
.Root__globalNav .search-searchCategory-categoryGrid > div[role="presentation"] {
  display: flex;
  flex-direction: column !important;
  min-width: 100% !important;
  width: 100% !important;
  row-gap: var(--card-gap);
}
.Root__globalNav .main-globalNav-navLink,
.Root__globalNav .search-searchCategory-categoryGrid > div[role="presentation"] > button {
  /* background-color: var(--spice-card); */
  border-radius: 0.5rem;
}

.custom-navlinks-scrollable_container {
  margin-top: var(--card-gap);
}

.custom-navlinks-scrollable_container div[role="presentation"] > * {
  margin: 0 !important;
}

.zugTpa7GhjPIQmTCgBzw:has(input:focus) {
  z-index: 5;
}

.Root__globalNav .main-globalNav-searchInputSection {
  display: flex;
  align-items: center;
  z-index: var(--above-main-and-now-playing-view-grid-area, 6);
}

.forceExpandSearchInput .main-globalNav-searchInputSection .main-globalNav-textWrapper {
  display: none;
}

.main-globalNav-textWrapper {
  margin-left: 3.125rem;
  position: absolute;
}

.main-globalNav-searchInputSection .main-globalNav-textWrapper {
  position: absolute;
  margin-left: 3.25rem;
  top: 50%;
  transform: translateY(-50%);
}

.Root__globalNav .search-searchCategory-carouselButton{
  display: none !important;
}

.Root__globalNav .search-searchCategory-categoryGrid {
  mask: none !important;
}

.main-globalNav-searchText {
  font-size: 1rem;
  font-weight: 700;
  flex-direction: row;
  display: flex;
  align-items: center;
  text-wrap: nowrap;
}

.forceExpandSearchInput .main-globalNav-searchInputContainer input {
  border: 1px solid var(--background-elevated-base);
}

.Root__globalNav .main-globalNav-navLink:hover,
.main-globalNav-searchInputContainer .SFAoASy0S_LZJmYZ3Fh9:hover,
.main-globalNav-searchInputContainer input:hover {
  background-color: rgba(var(--spice-rgb-selected-row), 0.1) !important;
}

.searchInputCollapsed .main-globalNav-searchInputContainer .jl5Sca1FSi1bSBIyQ72h {
  visibility: hidden;
}

.global-libraryX .main-globalNav-searchInputSection {
  min-width: 25vw;
}

.forceExpandSearchInput .main-globalNav-searchInputContainer .jl5Sca1FSi1bSBIyQ72h,
.searchInputCollapsed.forceExpandSearchInput .main-globalNav-searchInputContainer .jl5Sca1FSi1bSBIyQ72h {
  visibility: visible !important;
}

.custom-navlinks-scrollable_container {
  margin-top: 0;
}
.CCIGxtpAreSdwWRo14FE {
  width: 0 !important;
  height: 0 !important;
}
.main-globalNav-historyButtonsWrapper,
.TTB3lAVAhCK9Apl8quWw {
  -webkit-margin-start: 0px;
  -webkit-padding-start: 0px;
  padding-inline-start: 0px;
  margin-block-start: 0px;
}
.main-globalNav-historyButtonsSpacer {
  pointer-events: none;
  position: fixed; 
  z-index: -9;
}
.OPsY6bKl1_FfA8jFpq1V,
.Kgjmt7IX5samBYUpbkBu,
.ZIgg4O2heaZyD8Z7o7MQ,
.IEulmRakQT_FgH43ov2a,
.B9lb86gGqGGFcSZZ95bA,
.Il1Yz_P2hpTeJyNf9mi_ {
  display: none;
}
.Root__globalNav.global-libraryX {
  width: 100%;
}
.Root:has([data-right-sidebar-hidden=true] .yXlTmwlWtDebsivA1gM6) .Root__globalNav {
  grid-column: global-nav/right-sidebar !important;
}
.Root__cinema-view.E3V79f6uQHeTnFxMhoju._3_LWNvctz6LK865o0Fvg {
  grid-row: global-nav / right-sidebar !important;
}
`;

class LibXReborn {
  constructor() {
    this.navElement = null;
    this.isWindows = this.detectOS("win");
    this.isMac = this.detectOS("mac");
    this.mutationObserver = null;
    this.resizeObserver = null;
  }

  detectOS(osName) {
    const os = window.Spicetify?.Platform?.operatingSystem ||
      window.Spicetify?.Platform?.PlatformData?.os_name || "";
    return os.toLowerCase().includes(osName.toLowerCase());
  }


  injectStyles() {
    let styleElement = document.getElementById(CONFIG.stylesheetId);

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = CONFIG.stylesheetId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = CUSTOM_CSS;
  }

  setElementPositions() {
    if (!this.navElement) return;

    const historyContainer = this.navElement.querySelector(
      ".main-globalNav-historyButtonsContainer .main-globalNav-historyButtons, .main-globalNav-historyButtons"
    );

    if (!historyContainer) return;

    const width = historyContainer.getBoundingClientRect().width || 80;

    const spacerElement = this.navElement.querySelector(".main-globalNav-historyButtonsSpacer");
    let historyLeft;
    if (spacerElement) {
      historyLeft = spacerElement.getBoundingClientRect().width * 2 + 8;
    } else {
      const osOffset = this.isWindows ? 64 : this.isMac ? 80 : 0;
      historyLeft = osOffset + CONFIG.defaultGap;
    }

    this.setCssVar("history-button-left", historyLeft);
    this.setCssVar("search-container-left", historyLeft + width + CONFIG.defaultGap);
    this.setCssVar("search-container-top", CONFIG.defaultGap);
  }
  setCssVar(name, value) {
    this.navElement.style.setProperty(`--${name}`, `${value}px`);
  }


  addButtonText() {
    const buttonSelectors = [
      ".search-searchCategory-categoryGrid > div > button",
      ".main-globalNav-link-icon",
      ".main-globalNav-navLink"
    ].map(sel => `${CONFIG.globalNavSelector} ${sel}`).join(", ");

    const buttons = document.querySelectorAll(buttonSelectors);

    buttons.forEach((btn) => {
      if (btn.querySelector(".main-globalNav-textWrapper, .main-globalNav-searchText")) return;

      const textContent = btn.getAttribute("aria-label") || btn.getAttribute("alt") || "";
      if (!textContent) return;

      const textElement = document.createElement("div");
      textElement.className = "main-globalNav-searchText encore-text encore-text-body-medium-bold";
      textElement.textContent = textContent;

      const wrapperElement = document.createElement("span");
      wrapperElement.className = "main-globalNav-textWrapper";
      wrapperElement.appendChild(textElement);

      btn.appendChild(wrapperElement);
    });
  }

  applyModifications = () => {
    this.setElementPositions();
    this.addButtonText();
    this.navElement?.classList.add(CONFIG.libXClass);
  }

  attachObservers() {
    const target = this.navElement?.querySelector(".main-globalNav-historyButtonsContainer");

    if (this.mutationObserver) this.mutationObserver.disconnect();
    if (this.resizeObserver) this.resizeObserver.disconnect();

    if (target) {
      this.mutationObserver = new MutationObserver(this.applyModifications);
      this.mutationObserver.observe(target, { childList: true, subtree: true });
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.applyModifications();
    });

    if (this.navElement) {
      this.resizeObserver.observe(this.navElement);
      const historyButtons = this.navElement.querySelector(".main-globalNav-historyButtons");
      if (historyButtons) this.resizeObserver.observe(historyButtons);
    }
  }

  async init() {
    console.log("[LibX-Reborn] Running GlobalNav to LibraryX script...");

    const MAX_ATTEMPTS = 3;
    let attempts = 0;

    const tryLoad = async () => {
      this.navElement = document.querySelector(CONFIG.globalNavSelector);
      attempts++;

      if (this.navElement) {
        this.injectStyles();
        this.applyModifications();

        setTimeout(this.applyModifications, 1000);
        this.attachObservers();
      } else if (attempts < MAX_ATTEMPTS) {
        console.log("[LibX-Reborn] GlobalNav not found, retrying...");
        await new Promise(res => setTimeout(res, 1000));
        await tryLoad();
      } else {
        const msg = "[LibX-Reborn] GlobalNav Script is not available on this nav mode.";
        console.error(msg);
        window.Spicetify?.showNotification?.(msg, true);
      }
    };

    await tryLoad();
  }
}

(async function main() {
  while (!window.Spicetify?.showNotification) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  try {
    const extension = new LibXReborn();
    await extension.init();
  } catch (error) {
    const msg = `[LibX-Reborn] Error: ${error.message}`;
    console.error(msg);
    window.Spicetify?.showNotification(msg, true);
  }
})();