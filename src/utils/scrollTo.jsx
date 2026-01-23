/**
 * 滾動到指定元素位置
 * @param {string} selector - CSS 選擇器，預設為 '.container.mt-4'
 * @param {ScrollLogicalPosition} block - 垂直方向對齊方式，預設為 'start' (start, center, end, nearest)
 */
export const scrollToTop = (selector = '.container.mt-4', block = 'start') => {
    setTimeout(() => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block });
        }
    }, 0);
};
