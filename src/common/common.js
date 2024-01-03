import { toast } from "react-toastify";

// export const showTime = (time) => {
//     let now = new Date();
//     let from = new Date(time);
//     const newNow = {
//         year: now.getFullYear(),
//         month: now.getMonth(),
//         date: now.getDate(),
//     }

//     const newFrom = {
//         year: from.getFullYear(),
//         month: from.getMonth(),
//         date: from.getDate(),
//     }

//     if (newNow.year == newFrom.year) {
//         if (newNow.month == newFrom.month && newNow.date == newFrom.date) {

//             let diff = now.getTime() - from.getTime();
//             const hours = Math.floor(diff / 3600000);
//             if (hours > 0) {
//                 return `${hours} giờ trước`
//             } else {
//                 diff = diff % 3600000;
//                 const minutes = Math.floor(diff / 60000);
//                 if (minutes > 0) {
//                     return `${minutes} phút trước`
//                 } else {
//                     return "vài giây trước"
//                 }
//             }
//         } else {
//             return `${newFrom.date} tháng ${newFrom.month + 1}, lúc ${from.getHours()}:${from.getMinutes()}`
//         }
//     } else {
//         return `${newFrom.date} tháng ${newFrom.month + 1}, ${newFrom.year}`
//     }
// }

const toastOption = {
    position: "bottom-right",
    autoClose: 2000,
    closeButton: false,
    closeOnClick: true,
}

export const toastInfo = msg => {
    toast.info(msg, toastOption);
}


export const toastError = error => {
    console.log(error);
    const msg = error.response && error.response.data || error.message;
    // const msg = "Lỗi hệ thống!";
    toast.error(msg, toastOption);
}

export const showPrice = (price) => {
    if (!price) return '';
    let numberStr = price.toString();
    numberStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return numberStr;
}

export const showTime = (time) => {
    const myDate = new Date(time);
    myDate.setHours(myDate.getHours() - 7);
    const year = myDate.getFullYear();
    const month = (myDate.getMonth() + 1).toString().padStart(2, '0');
    const day = myDate.getDate().toString().padStart(2, '0');
    const hours = myDate.getHours().toString().padStart(2, '0');
    const minutes = myDate.getMinutes().toString().padStart(2, '0');

    return `${day}-${month}-${year}, lúc ${hours}:${minutes}`;
}

export const findName = (data, key) => {
    const r = Object.keys(data).find(k => data[k].key == key);
    return (r);
}

export const secondsToHMS = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours > 0 ? padZero(hours) + ':' : '';
    const formattedMinutes = padZero(minutes);
    const formattedSeconds = padZero(remainingSeconds);

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}

export const convertTimestampToDate = (timestamp) => {
    const inputDate = new Date(timestamp);

    const day = padZero(inputDate.getDate());
    const month = padZero(inputDate.getMonth() + 1); // Months are zero-based
    const year = inputDate.getFullYear();
    const hours = padZero(inputDate.getHours());
    const minutes = padZero(inputDate.getMinutes());

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedTime} - ${formattedDate}`;
}

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}

export const calculateKDA = (k, d, a) => {
    const kda = (d == 0) ? (k + a) : (k + a) / d;
    return kda.toFixed(2);
}