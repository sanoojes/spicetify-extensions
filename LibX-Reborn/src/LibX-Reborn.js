const GLOBAL_NAV_SELECTOR = '.Root__globalNav';

const checkForGlobalNav = () =>
  document.querySelector('.globalNav') ||
  document.querySelector('.Root__globalNav') ||
  false;

let isGlobalNavAvailable = checkForGlobalNav();

const customStyles = `
.Root__top-container {
  padding-top: 64px !important;
  grid-template-areas:
    "global-nav main-view right-sidebar"
    "left-sidebar main-view right-sidebar"
    "now-playing-bar now-playing-bar now-playing-bar" !important;

  grid-template-rows: auto 1fr auto;
}

.Root__globalNav>* {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.Root__globalNav {
  --library-bg-color: var(--spice-sidebar, var(--spice-main));
  height: unset;
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

.main-globalNav-searchInputSection {
  margin-inline: unset;
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

.main-globalNav-historyButtons {
  left: 4vw;
}

.Root__globalNav .main-topBar-topbarContentRight {
  right: 10vw;
}

.main-globalNav-navLinkActive {
  --library-bg-color: var(--spice-card);
  background-color: var(--library-bg-color) !important;
  border-radius: 0.5rem !important;
}

.Root__globalNav {
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

.main-globalNav-searchInputSection,
.searchInputCollapsed:not(.forceExpandSearchInput) .main-globalNav-searchInputSection>.main-globalNav-searchInputContainer {
  width: 100% !important;
}


.main-globalNav-searchInputContainer .SFAoASy0S_LZJmYZ3Fh9:hover,
.main-globalNav-searchInputContainer input:hover {
  --library-bg-color: var(--spice-card);
  background-color: var(--library-bg-color) !important;
}

.searchInputCollapsed .main-globalNav-searchInputContainer .jl5Sca1FSi1bSBIyQ72h {
  visibility: hidden;
}

.forceExpandSearchInput .main-globalNav-searchInputContainer .jl5Sca1FSi1bSBIyQ72h,
.searchInputCollapsed.forceExpandSearchInput .main-globalNav-searchInputContainer .jl5Sca1FSi1bSBIyQ72h {
  visibility: visible !important;
}

:root {
  /* Set sidebar width as 360px for now */
  --left-sidebar-width: 360 !important;
}
`;

const addGlobalNavStyles = () => {
  const elements = document.querySelectorAll(
    '.Root__globalNav .search-searchCategory-categoryGrid > div > button, .Root__globalNav .main-globalNav-searchContainer > .main-globalNav-link-icon, .Root__globalNav .main-globalNav-searchInputSection'
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
    console.log('Running GlobalNav to LibraryX script...');

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
          globalNavElement.classList.add('global-libraryX');
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
          'GlobalNav to Library Script is not available on this nav mode.';
        console.error(msg);
        Spicetify.showNotification(msg, true);
      }
    };

    await checkGlobalNav();
  } catch (error) {
    const msg = `Error running GlobalNav to LibraryX script:${error}`;
    console.error(msg);
    Spicetify.showNotification(msg, true);
  }
})();

