import axios, { AxiosError, AxiosResponse } from "axios";
import { baseUrlAPI } from "../common/SD";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

axios.defaults.baseURL = baseUrlAPI;

//ฟังก์ชันนี้เป็นการสร้างฟังก์ชันที่รับค่า response ที่ได้รับจาก axios แล้วส่งคืนเฉพาะ data จาก response
const responseBody = (response: AxiosResponse) => response.data;

// หากคำขอเสร็จสมบูรณ์โดยไม่มีข้อผิดพลาด ค่าตอบกลับ (response) จะถูกส่งผ่านกลับไปทันทีโดยไม่มีการปรับเปลี่ยน
axios.interceptors.response.use(async response => {
    await sleep();
    return response;

}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse; //การตอบกลับจากเซิร์ฟเวอร์ที่มีข้อผิดพลาด
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }
                }
                
                throw modelStateErrors.flat();
            }
            toast.error(data.title)
            break;
        case 401:
            toast.error(data.title)
            break;
        case 500:
            router.navigate("/server-error", {state: {error: data}});
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
});

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('product'),
    details: (id: number) => requests.get(`product/${id}`)
}

const TestError = {
    get400Error: () => requests.get("buggy/bad-request"),
    get401Error: () => requests.get("buggy/unauthorised"),
    get404Error: () => requests.get("buggy/not-found"),
    get500Error: () => requests.get("buggy/server-error"),
    getValidationError: () => requests.get("buggy/validation-error"),
}

export const Apis = {
    Catalog,
    TestError
}