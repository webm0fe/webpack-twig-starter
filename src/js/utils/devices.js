const breakpoint = {
    md: 640,
    lg: 990,
    xl: 1360,
};

const isDesktop = () => window.matchMedia(`(min-width: ${breakpoint.lg}px)`).matches;
const isMobile = () => window.matchMedia(`(max-width: ${breakpoint.md - 1}px)`).matches;
const isTablet = () =>
    window.matchMedia(`(min-width: ${breakpoint.md}px) and (max-width: ${breakpoint.lg - 1}px)`).matches;
const isMobileDevice = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export { breakpoint, isDesktop, isMobile, isTablet, isMobileDevice };
