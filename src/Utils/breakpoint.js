const breakpoint = str => {
    if (str === 'desktop' && window.innerWidth >= 1025) return true;
    if (str === 'tablet' && window.innerWidth <= 1024) return true;
    if (str === 'mobile' && window.innerWidth <= 750) return true;
    
    return false;
}

export default breakpoint;