/**
 * Utility function for smooth scrolling to elements
 */
export const smoothScrollTo = (elementId: string): void => {
  // Remove the '#' if it exists
  const targetId = elementId.replace('#', '');
  const element = document.getElementById(targetId);
  
  if (element) {
    // Use scrollIntoView with smooth behavior
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    
    // Update URL without causing a page reload
    window.history.pushState(null, '', `#${targetId}`);
  }
};

/**
 * Fix for known scrolling issues in iOS Safari
 * This can be called in useEffect at the component or page level
 */
export const fixIOSScrolling = (): void => {
  // Check if we're on iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  
  if (isIOS) {
    // Add event listener for hash changes
    window.addEventListener('hashchange', () => {
      // Get the hash without the #
      const hash = window.location.hash.substring(1);
      if (hash) {
        // Wait a tiny bit for the default behavior to happen
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            // Manually adjust scroll position
            window.scrollTo({
              top: element.offsetTop,
              behavior: 'smooth'
            });
          }
        }, 10);
      } else {
        // If no hash, scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }
};

/**
 * Fix for the "stuck at bottom" scrolling issue
 * Add this to your main page component
 */
export const fixScrollToTop = (): void => {
  // Add event listener for scroll
  window.addEventListener('scroll', () => {
    // This fixes an issue where scrolling to top gets stuck
    if (window.scrollY === 0) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  });
  
  // Make sure home/top links always work
  const topLinks = document.querySelectorAll('a[href="#"], a[href="#home"], a[href="#top"]');
  topLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', window.location.pathname);
    });
  });
};