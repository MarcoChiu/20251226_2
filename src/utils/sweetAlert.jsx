import Swal from 'sweetalert2';

export const swalSuccess = (title, text = null, timer = 1500) => {
    return Swal.fire({
        icon: 'success',
        title,
        text,
        showConfirmButton: false,
        timer
    });
};

export const swalError = (title, text = null) => {
    return Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonText: '確定'
    });
};

export const swalToast = (title, icon = 'success') => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    return Toast.fire({
        icon,
        title
    });
};

export const swalConfirm = (title, text, confirmButtonText = '確定', cancelButtonText = '取消') => {
    return Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText,
        cancelButtonText
    });
};
