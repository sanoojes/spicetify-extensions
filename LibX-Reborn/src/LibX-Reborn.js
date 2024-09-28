const config = {
  defaultGap: 8,
  globalNavSelector: '.Root__globalNav',
  libXGlobalNavSelectorClass: 'global-libraryX',
  stylesheetSelectorClass: 'libraryX-styles',
};

const checkForGlobalNav = () =>
  document.querySelector('.globalNav') ||
  document.querySelector('.Root__globalNav') ||
  false;

let isWindows = detectOS('win');
let isMac = detectOS('mac');

let isGlobalNavAvailable = checkForGlobalNav();
let globalNavElement = getGlobalNavElement();

const customStyles = `
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

#Desktop_LeftSidebar_Id,
.Root__globalNav {
  transition: width 0.3s ease;
}

.Root__globalNav,
.spotify__container--is-desktop.spotify__os--is-macos .Root__globalNav,
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
  padding: 1rem;
  border: none !important;
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
  padding: 0.5rem;
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

.Root__globalNav .main-globalNav-searchContainer>span:nth-child(2),
.Root__globalNav .main-globalNav-searchContainer>span[role='presentation'],
.Root__globalNav .main-globalNav-searchContainer>.zugTpa7GhjPIQmTCgBzw {
  top: var(--search-container-top, var(--panel-gap, 0.5rem)) !important;
  left: var(--search-container-left, var(--panel-gap, 0.5rem)) !important;
}

.Root__globalNav .main-topBar-topbarContentRight {
  right: 0.5rem;
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
  text-wrap: nowrap;
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

.global-libraryX .main-globalNav-searchInputSection {
  min-width: 25vw;
  /* max-width: 25vw; */
}

.forceExpandSearchInput .main-globalNav-searchInputContainer .jl5Sca1FSi1bSBIyQ72h,
.searchInputCollapsed.forceExpandSearchInput .main-globalNav-searchInputContainer .jl5Sca1FSi1bSBIyQ72h {
  visibility: visible !important;
}`;

const setElementPositions = () => {
  const historyButtonsElement = document.querySelector(
    '.Root__globalNav .main-globalNav-historyButtonsContainer>.main-globalNav-historyButtons'
  );
  if (historyButtonsElement) {
    const historyButtonsWidth =
      historyButtonsElement.getBoundingClientRect().x +
        historyButtonsElement.getBoundingClientRect().width || 80;

    const searchElement = document.querySelector(
      `.Root__globalNav .main-globalNav-searchSection > .main-globalNav-searchContainer>span[role='presentation'],
      .Root__globalNav .main-globalNav-searchSection > .main-globalNav-searchContainer>.zugTpa7GhjPIQmTCgBzw`
    );

    if (searchElement) {
      if (isWindows) {
        setElementPositionProperties('history-button', {
          left: 64 + config.defaultGap,
        });
        setElementPositionProperties('search-container', {
          left: historyButtonsWidth + config.defaultGap,
          top: config.defaultGap,
        });
      } else if (isMac) {
        setElementPositionProperties('history-button', {
          left: 80 + config.defaultGap,
        });
        setElementPositionProperties('search-container', {
          left: historyButtonsWidth + config.defaultGap,
          top: config.defaultGap,
        });
      } else {
        setElementPositionProperties('history-button', {
          left: config.defaultGap,
        });
        setElementPositionProperties('search-container', {
          left: historyButtonsWidth + config.defaultGap,
        });
      }
    }
  }
};

const addButtonText = () => {
  const buttonElements = document.querySelectorAll(
    `.Root__globalNav .search-searchCategory-categoryGrid > div > button, 
    .Root__globalNav .main-globalNav-searchContainer > .main-globalNav-link-icon`
  );

  for (const element of buttonElements) {
    if (
      element.querySelector(
        `.main-globalNav-textWrapper,
        .main-globalNav-searchText.encore-text.encore-text-body-medium-bold`
      )
    )
      return;

    const newTextElement = document.createElement('div');
    newTextElement.className =
      'main-globalNav-searchText encore-text encore-text-body-medium-bold';
    newTextElement.textContent =
      element.getAttribute('aria-label') || element.getAttribute('alt') || '';
    const newTextWrapperElement = document.createElement('span');
    newTextWrapperElement.className = 'main-globalNav-textWrapper';
    newTextWrapperElement.appendChild(newTextElement);

    element.appendChild(newTextWrapperElement);
  }
};

const addGlobalNavStyles = () => {
  setElementPositions();
  addButtonText();
  addLibXClasses();
};

const attachGlobalNavObserver = () => {
  const globalNavObserver = new MutationObserver(addGlobalNavStyles);

  const globalNavButtonWrapperElement = document.querySelector(
    '.Root__globalNav .main-globalNav-historyButtonsContainer'
  );

  if (globalNavButtonWrapperElement) {
    globalNavObserver.observe(globalNavButtonWrapperElement, {
      childList: true,
      subtree: true,
    });
  } else {
    globalNavObserver.disconnect();
  }
};

const setElementCustomProperty = (
  element,
  propertyName,
  value,
  unit = 'px'
) => {
  if (!element) return;

  element.style.setProperty(`--${propertyName}`, `${value}${unit}`);
};

const setElementPositionProperties = (
  propertyName,
  position = { left: 0, top: config.defaultGap, right: 0, bottom: 0 }
) => {
  if (!globalNavElement) return;

  for (const [key, value] of Object.entries(position)) {
    setElementCustomProperty(globalNavElement, `${propertyName}-${key}`, value);
  }
};

/**
 * Adds libX class name to GlobalNav
 */
const addLibXClasses = () => {
  try {
    globalNavElement = getGlobalNavElement();
    if (globalNavElement)
      globalNavElement.classList.add(config.libXGlobalNavSelectorClass);
  } catch (error) {
    console.error(
      `[LibX-Reborn] Error adding class to global nav element: ${error.message}`
    );
  }
};

/**
 * Adds custom style sheet for libX
 */
const addLibXStyleSheet = () => {
  let styleElement = document.getElementById(
    `#${config.stylesheetSelectorClass}`
  );
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = config.stylesheetSelectorClass;
    styleElement.innerHTML = customStyles;
    document.head.appendChild(styleElement);
  } else {
    styleElement.innerHTML = customStyles;
  }
};

/**
 * Main const
 */
(async () => {
  while (!Spicetify?.showNotification) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  try {
    console.log('[LibX-Reborn] Running GlobalNav to LibraryX script...');

    let attempts = 0;
    const maxAttempts = 3;

    const checkGlobalNav = async () => {
      isWindows = detectOS('win');
      isMac = detectOS('mac');

      isGlobalNavAvailable = checkForGlobalNav();
      attempts++;

      if (isGlobalNavAvailable) {
        addLibXStyleSheet(); // add stylesheet

        addGlobalNavStyles();
        setTimeout(addGlobalNavStyles, 1000); // just to make sure every thing works

        attachGlobalNavObserver();
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

function detectOS(os_name) {
  if (Spicetify.Platform?.operatingSystem)
    return Spicetify.Platform?.operatingSystem
      .toLowerCase()
      .includes(os_name.toLowerCase());

  if (Spicetify.Platform?.PlatformData?.os_name)
    return Spicetify.Platform.PlatformData.os_name
      .toLowerCase()
      .includes(os_name.toLowerCase());

  return false;
}

function getGlobalNavElement() {
  return document.querySelector(config.globalNavSelector);
}
