import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import history from "../../../../utils/history";
import BasketShopList from "../basketShopList/basketShopList";
import { useSelector } from "react-redux";
import { getProductById } from "../../../../store/products";
import basketService from "../../../../service/basket.service";
// import productService from "../../../../service/product.service";

const BasketShopPage = ({ prodId }) => {
    console.log(prodId);
    // const dispatch = useDispatch();
    const [productsItems, setProductItems] = useState([]);

    const product = useSelector(getProductById(prodId));
    console.log(product);

    const content = basketService.getBasket(product, prodId);
    console.log(content);

    // useEffect(() => {
    //     const getBasket = async () => {
    //         try {
    //             // const { contentAll } = await basketService.fetchAll(prodId);
    //             // console.log(contentAll);
    //             const { content } = await productService.getBasketProduct(prodId);
    //             console.log(content);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     getBasket();
    // }, []);

    const onAddProduct = (content) => {
        console.log(content);

        // console.log(product);
        // const exist = productsItems.find((p) => p._id === product._id);
        // if (exist) {
        //     const newCartProducts = productsItems.map((p) =>
        //         p._id === product._id
        //             ? {
        //                   ...exist,
        //                   count: exist.count - 1
        //               }
        //             : p
        //     );
        basketService.getBasket(product, prodId);
        // basketService.fetchAll(product, prodId);
        // setProductItems(newCartProducts);
        // localStorage.setItem(
        //     "productsItems",
        //     JSON.stringify(newCartProducts)
        // );
        // } else {
        //     const newCartProducts = [
        //         ...productsItems,
        //         {
        //             ...product,
        //             qty: 1,
        //             countPay: 1
        //         }
        //     ];
        //     setProductItems(newCartProducts);
        //     localStorage.setItem(
        //         "productsItems",
        //         JSON.stringify(newCartProducts)
        //     );
        // }
        history.push(`/basket`);
    };

    const onRemoveProduct = (product) => {
        const exist = productsItems.find((p) => p._id === product._id);
        if (exist.qty === 1) {
            const newCartProducts = productsItems.filter(
                (p) => p._id !== product._id
            );
            setProductItems(newCartProducts);
        } else {
            const newCartProducts = productsItems.map((p) =>
                p._id === product._id ? { ...exist, count: exist.count + 1 } : p
            );
            setProductItems(newCartProducts);
        }
    };

    useEffect(() => {
        setProductItems(
            localStorage.getItem("productsItems")
                ? JSON.parse(localStorage.getItem("productsItems"))
                : []
        );
    }, []);

    if (product) {
        return (
            <div className="d-flex flex-column">
                <input
                    type="text"
                    name="searchQuery"
                    placeholder="Путь к товару"
                    className="mb-4 text-center border border-warning"
                    style={{ background: "#dee2e6" }}
                />

                <BasketShopList
                    product={product}
                    content={content}
                    item={productsItems.find((p) => p._id === product._id)}
                    onAddProduct={onAddProduct}
                    onRemoveProduct={onRemoveProduct}
                />
            </div>
        );
    } else {
        return "loading BasketShopPage.jsx";
    }
};

BasketShopPage.propTypes = {
    prodId: PropTypes.string
};

export default BasketShopPage;
