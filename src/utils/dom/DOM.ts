export const visibleHeaderAndFooter = (display: 'none' | 'block'):void => {

    setTimeout(() => {
        const header:HTMLElement = document.querySelector('header');
        const footer:HTMLElement = document.querySelector('footer');

        header.style.display = display;
        footer.style.display = display;
    }, 60);
    
}

