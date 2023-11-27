import dayjs from "dayjs";

// 日付表示フォーマット用関数
export const formatDate = (createdAt: string) => {
    const timezone = require("dayjs/plugin/timezone");
    dayjs.extend(timezone);
    return dayjs(createdAt).format("YYYY/MM/DD HH:mm");
}