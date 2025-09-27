const initStickyHeader = () => {
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const headerContainer = document.querySelector('[data-header-offset]');
  const heroSection = document.querySelector('.hero');

  if (!header || !headerContainer) return;

  const parseRem = value => {
    const rem = parseFloat(value);

    return Number.isFinite(rem) && rem >= 0 ? rem : 2;
  };

  const { pinThreshold } = header.dataset;
  const pinThresholdRem = parseRem(pinThreshold);

  const updateHeaderHeight = () => {
    root.style.removeProperty('--header-height');

    const naturalHeight = header.offsetHeight;

    return root.style.setProperty('--header-height', `${naturalHeight}px`);
  };

  let rootRem = parseFloat(getComputedStyle(root).fontSize);
  let isPinned = false;

  const updateRootRem = () => {
    rootRem = parseFloat(getComputedStyle(root).fontSize);
  };

  const shouldPin = () => window.scrollY >= rootRem * pinThresholdRem;

  const syncPinnedState = () => {
    const nextState = shouldPin();

    if (heroSection) {
      heroSection.classList.toggle('hero--header-overlap', !nextState);
    }

    if (nextState === isPinned) return;

    isPinned = nextState;
    header.classList.toggle('site-header--pinned', isPinned);
    headerContainer.classList.toggle('site-container--pinned', isPinned);

    updateHeaderHeight();
  };

  const handleResize = () => {
    updateRootRem();
    updateHeaderHeight();
    syncPinnedState();
  };

  updateHeaderHeight();
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', syncPinnedState, { passive: true });

  syncPinnedState();
};

const initApp = () => initStickyHeader();

//* App Initialization

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp, { once: true });
} else {
  initApp();
}
