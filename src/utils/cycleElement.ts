export const cycleElement = (element:HTMLElement , selector:string  ,  defaultClass:string , classVerifiqued:string , cb:(e:HTMLElement) => void):void => {
    const filters:any = document.querySelector(selector);

    const childs:HTMLElement[] = [...filters.children]; 

    childs.forEach(e => {
        if(e === element || e === element.parentNode) {
            e.className = classVerifiqued
            cb(e);
        }else {
            e.className = defaultClass
        }
    })
}