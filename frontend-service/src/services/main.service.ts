import { ICategory, IProduct } from "../utils/custom.data";
import { http } from "../utils/http.common";

class MainService {
    allProducts() {
        return http.get(`/product/all`)
    }
    addProduct(data: any) {
        return http.post('/product/create', data);
    }
    updateProduct(id: string, data: IProduct) {
        return http.put(`/product/${id}`, data);
    }
    deleteProduct(id: string) {
        return http.delete(`/product/${id}`);
    }
    viewProduct(id: string) {
        return http.get(`/product/${id}`)
    }
    listCategory() {
        return http.get(`/ut/list-categories`)
    }
    createCategory(data: any) {
        return http.post(`/category/create`, data)
    }
    purchaseProduct(data: any) {
        return http.post(`/product/purchase`, data)
    }
    getPurchasedProducts() {
        return http.get(`/purchase/list-all`)
    }
    recentlyPurchaseProduct() {
        return http.get(`/purchase/list-recent`)
    }
}
export default new MainService();