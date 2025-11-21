//預設匯出:每個檔案能有一個預設匯出
export default {
    myName :'Marco',
    fn(){
        console.log('預設匯出:This is react005.js');
    }
}

//具名匯出:每個檔案能有多個具名匯出
export const myName="Marco";
export function fn(){
    console.log('具名匯出:This is react005.js');
}