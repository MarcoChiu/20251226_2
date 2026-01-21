import Swal from 'sweetalert2';

/**
 * 顯示 Toast 提示 (自動關閉)
 * @param {string} icon - 'success', 'error', 'warning', 'info', 'question'
 * @param {string} title - 標題
 * @param {number} timer - 自動關閉時間 (毫秒)，預設 1500
 */
export const showToast = (icon, title, timer = 1500) => {
    return Swal.fire({
        icon,
        title,
        showConfirmButton: false,
        timer
    });
};

/**
 * 顯示一般 Alert 提示 (需要點擊確認)
 * @param {string} icon - 'success', 'error', 'warning', 'info', 'question'
 * @param {string} title - 標題
 * @param {string} text - 內文 (選填)
 */
export const showAlert = (icon, title, text = '') => {
    return Swal.fire({
        icon,
        title,
        text,
    });
};

/**
 * 顯示確認對話框
 * @param {object} options - 客製化選項
 * @param {string} options.title - 標題
 * @param {string} options.text - 內文
 * @param {string} options.icon - 圖示 (預設 warning)
 * @param {string} options.confirmButtonText - 確認按鈕文字 (預設 '確定')
 * @param {string} options.cancelButtonText - 取消按鈕文字 (預設 '取消')
 * @param {string} options.confirmButtonColor - 確認按鈕顏色 (預設 #3085d6)
 * @param {string} options.cancelButtonColor - 取消按鈕顏色 (預設 #d33)
 * @returns {Promise<SweetAlertResult>} - 回傳 Promise，result.isConfirmed 為 true 表示點擊確認
 */
export const showConfirm = ({
    title,
    text,
    icon = 'warning',
    confirmButtonText = '確定',
    cancelButtonText = '取消',
    confirmButtonColor = '#3085d6',
    cancelButtonColor = '#d33',
}) => {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonColor,
        cancelButtonColor,
        confirmButtonText,
        cancelButtonText,
    });
};
