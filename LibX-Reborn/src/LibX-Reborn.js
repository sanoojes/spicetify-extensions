const GLOBAL_NAV_SELECTOR = '.Root__globalNav';
const GLOBAL_NAV_SELECTOR_CLASS = 'global-libraryX';

const checkForGlobalNav = () =>
  document.querySelector('.globalNav') ||
  document.querySelector('.Root__globalNav') ||
  false;

let isGlobalNavAvailable = checkForGlobalNav();

const customStyles = `
.spotify__container--is-desktop .global-nav .Root__top-container:has(> .global-libraryX),
.Root__top-container:has(> .global-libraryX),
.Root__top-container {
  padding-top: 64px !important;
  grid-template-areas:
    "global-nav main-view right-sidebar"
    "left-sidebar main-view right-sidebar"
    "now-playing-bar now-playing-bar now-playing-bar" !important;

  grid-template-rows: auto 1fr auto;
}

.spotify__container--is-desktop.spotify__os--is-windows .Root__globalNav,
.Root__globalNav {
  padding-inline-end: 0 !important;
  padding-inline-start: 0 !important;
  padding-block: 0 !important;
  padding-inline: 0 !important;
  padding-block-end: 0 !important;
  padding-block-start: 0 !important;
  padding: 0.5rem !important;
}

.Root__globalNav>div {
  padding-left: 0.25rem !important;
}

.Root__globalNav button {}

.Root__globalNav {
  --library-bg-color: var(--background-base, var(--spice-main));
  height: unset;
  max-width: calc(var(--left-sidebar-width) *1px);
  width: calc(var(--left-sidebar-width) *1px);
  background-color: var(--library-bg-color);
  border-radius: 8px;
  padding-inline: unset !important;
  align-items: unset;
  padding: 8px;
}


.Root__globalNav .main-globalNav-link-icon {
  background-color: unset;
  transform: unset;
  justify-content: unset;
  height: 3.25rem;
  max-height: 3.25rem;
}

.Root__nav-bar .LayoutResizer__resize-bar {
  height: 82vh;
  bottom: 0;
}

.main-actionButtons {
  display: inline-flex !important;
  animation: unset !important;
}

.main-globalNav-historyButtons>* {
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
  padding: var(--panel-gap);
  height: max-content;
  width: max-content;
}

.zugTpa7GhjPIQmTCgBzw,
.main-globalNav-searchInputSection {
  position: fixed;
  top: var(--panel-gap);
  left: 1vw;
  max-width: 20rem;
  margin-inline: unset;
  left: 5rem;
}

.spotify__container--is-desktop.spotify__os--is-macos .zugTpa7GhjPIQmTCgBzw,
.spotify__container--is-desktop.spotify__os--is-windows .zugTpa7GhjPIQmTCgBzw,
.spotify__container--is-desktop.spotify__os--is-macos .main-globalNav-searchInputSection,
.spotify__container--is-desktop.spotify__os--is-windows .main-globalNav-searchInputSection {
  left: 10rem;
}

.Root__globalNav .main-globalNav-historyButtons {
  left: var(--panel-gap);
}

.spotify__container--is-desktop.spotify__os--is-macos .Root__globalNav .main-globalNav-historyButtons,
.spotify__container--is-desktop.spotify__os--is-windows .Root__globalNav .main-globalNav-historyButtons {
  left: 5rem;
}

.Root__globalNav .main-topBar-topbarContentRight {
  right: var(--panel-gap);
}

.spotify__container--is-desktop.spotify__os--is-windows .Root__globalNav .main-topBar-topbarContentRight {
  right: 10vw;
}

.main-globalNav-navLinkActive {
  --library-bg-color: var(--spice-card);
  background-color: var(--library-bg-color) !important;
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
.Root__globalNav .search-searchCategory-categoryGrid>div[role="presentation"] {
  display: flex;
  flex-direction: column !important;
  width: 100% !important;
  row-gap: var(--card-gap);
}

.Root__globalNav .search-searchCategory-categoryGrid>div[role="presentation"]>button {
  /* background-color: var(--spice-card); */
  border-radius: 0.5rem;
}


.custom-navlinks-scrollable_container {
  margin-top: var(--card-gap);
}

.custom-navlinks-scrollable_container div[role="presentation"]>* {
  margin: 0 !important;
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
  margin-left: 1rem;
}

.main-globalNav-searchInputSection .main-globalNav-textWrapper {
  position: absolute;
  margin-left: 3.25rem;
  top: 50%;
  transform: translateY(-50%);
}

.main-globalNav-searchText {
  font-size: 1rem;
  font-weight: 700;
  flex-direction: row;
  display: flex;
  align-items: center;
}

.forceExpandSearchInput .main-globalNav-searchInputContainer input {
  border: 1px solid var(--background-elevated-base);
}

.main-globalNav-searchInputContainer .SFAoASy0S_LZJmYZ3Fh9:hover,
.main-globalNav-searchInputContainer input:hover {
  --library-bg-color: var(--spice-card);
  background-color: var(--library-bg-color) !important;
}

.searchInputCollapsed .main-globalNav-searchInputContainer .jl5Sca1FSi1bSBIyQ72h {
  visibility: hidden;
}

.global-libraryX .main-globalNav-searchInputSection{
  min-width: 25vw;
  /* max-width: 25vw; */
}

.forceExpandSearchInput .main-globalNav-searchInputContainer .jl5Sca1FSi1bSBIyQ72h,
.searchInputCollapsed.forceExpandSearchInput .main-globalNav-searchInputContainer .jl5Sca1FSi1bSBIyQ72h {
  visibility: visible !important;
}
`;

function addLibXClasses() {
  const globalNavElement = document.querySelector(GLOBAL_NAV_SELECTOR);
  globalNavElement.classList.add(GLOBAL_NAV_SELECTOR_CLASS);
}

const addGlobalNavStyles = () => {
  addLibXClasses();

  const elements = document.querySelectorAll(
    '.Root__globalNav .search-searchCategory-categoryGrid > div > button, .Root__globalNav .main-globalNav-searchContainer > .main-globalNav-link-icon'
  );

  for (const element of elements) {
    const isSearchElement = element.querySelector('input');
    const textElement = element.querySelector(
      '.main-globalNav-searchText.encore-text.encore-text-body-medium-bold'
    );

    if (!textElement) {
      const newTextElement = document.createElement('div');
      newTextElement.className =
        'main-globalNav-searchText encore-text encore-text-body-medium-bold';
      newTextElement.textContent =
        element.getAttribute('aria-label') ||
        (isSearchElement ? 'Search' : '') ||
        '';
      const newTextWrapperElement = document.createElement('span');
      newTextWrapperElement.className = 'main-globalNav-textWrapper';
      newTextWrapperElement.appendChild(newTextElement);

      if (isSearchElement) {
        const iconElement = element.querySelector(
          '.main-globalNav-searchInputContainer>:first-child'
        );
        iconElement
          ? iconElement.appendChild(newTextWrapperElement)
          : element.appendChild(newTextWrapperElement);
      } else {
        element.appendChild(newTextWrapperElement);
      }
    }
  }
};

(async () => {
  while (!Spicetify?.showNotification) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  try {
    console.log('[LibX-Reborn] Running GlobalNav to LibraryX script...');

    let attempts = 0;
    const maxAttempts = 3;

    const checkGlobalNav = async () => {
      isGlobalNavAvailable = checkForGlobalNav();
      attempts++;

      if (isGlobalNavAvailable) {
        // GlobalNav found, proceed with script execution
        const styleSheetId = 'libraryX-styles';

        let styleElement = document.getElementById(`#${styleSheetId}`);
        if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.id = styleSheetId;
          styleElement.innerHTML = customStyles;
          document.head.appendChild(styleElement);
        } else {
          styleElement.innerHTML = customStyles;
        }

        // Initial toggle
        addGlobalNavStyles();

        // Wait for 200ms then start observing changes
        setTimeout(() => {
          const observer = new MutationObserver(addGlobalNavStyles);
          const globalNavElement = document.querySelector(GLOBAL_NAV_SELECTOR);
          addLibXClasses();

          if (globalNavElement) {
            observer.observe(globalNavElement, {
              childList: true,
              subtree: true,
            });
          }
        }, 200);
      } else if (attempts < maxAttempts) {
        // GlobalNav not found, wait and try again
        console.log('GlobalNav not found, retrying...');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        checkGlobalNav();
      } else {
        const msg =
          '[LibX-Reborn] GlobalNav to Library Script is not available on this nav mode.';
        console.error(msg);
        Spicetify.showNotification(msg, true);
      }
    };

    await checkGlobalNav();
  } catch (error) {
    const msg = `[LibX-Reborn] Error running GlobalNav to LibraryX script:${error}`;
    console.error(msg);
    Spicetify.showNotification(msg, true);
  }
})();
