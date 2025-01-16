// import httpService from "./http.service";
import httpService from "./http.service";
import productService from "./product.service";

const basketEndpoint = "basket/";
console.log(basketEndpoint);

const basketService = {
    fetchAll: async (content, _id) => {
        console.log(content);
        console.log(_id);
        const { data } = await httpService.get(basketEndpoint);
        console.log(data);
        return data;
    },
    getBasket: async (content, _id) => {
        console.log(content);
        console.log(_id);
        const { data } = await productService.getProduct(basketEndpoint + _id, {
            _id,
            ...content
        });
        console.log(data);
        return data;
    }
};

export default basketService;
