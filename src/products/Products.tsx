import React from 'react';
import jsonData from '../sample-data/catalogue.json'
import { Product, ProductData } from '../sample-data/Product';
import './Products.css'
import productImg from '../assets/product.jpg'
import FilterConfig from '../sample-data/FilterConfig';
import { rangeFilterTypes } from '../filter/Filter';

function Products(props: { searchBarText: string; filterConfig: FilterConfig[]}) {

    let {searchBarText, filterConfig} = props;

    let jsonInput: Product[] = jsonData as unknown as Product[]; 
    let items: ProductData[] = jsonInput
    .map((jsonObj) => new ProductData(jsonObj));

    if (searchBarText!=="") {
        items = items
        .filter((item) => item.searchString.toString().toLowerCase().includes(searchBarText.toLowerCase()));
    }

    if (filterConfig.length>0) {
        filterConfig.forEach((filterConf) => {
            if (filterConf.value.length>0) {
                if (rangeFilterTypes.indexOf(filterConf.filterType)>-1) {
                    //range filter 
                    
                    let itemsCopy = Object.assign([], items);
                    items=[];
                    filterConf.value.forEach((rangeFilterConf) => {
                        let filterItems = [];
                        if (rangeFilterConf.indexOf('+')>-1) {
                            const min = rangeFilterConf.replace("+", "");
                            filterItems = itemsCopy.filter((item) => {
                                let itemVal = item[filterConf.filterType];
                                return +itemVal>=+min;
                            })
                        } else {        
                            const min = rangeFilterConf.slice(0, rangeFilterConf.search("-"));
                            const max = rangeFilterConf.slice(rangeFilterConf.search("-")+1);
                            filterItems = itemsCopy.filter((item) => {
                                let itemVal = item[filterConf.filterType];
                                return +itemVal>=+min && +itemVal<=+max;
                            })
                        }
                        items=[...items, ...filterItems];
                    })
                    return;
                } 


                items = items.filter((item) => {
                    let itemVal = item[filterConf.filterType];
                    return filterConf.value.indexOf(itemVal.toString().toLowerCase())>-1;
                });
                
                
            }
        });
    }


    function renderImgTag(quantity: number) {
        if (quantity===0) {
            return "Sold Out";
        } else if (quantity<3) {
            return "Hurry up! Only few left";
        }
        return "";
    }

 
    return (
        <div className="product-window">
            { items.map((item: Product) => {
                    return (
                        <div key={item.id} className="product">
                            <div className="product-image">
                                <img src={productImg} alt="{item.name}"></img>
                                <span>{ renderImgTag(item.quantity) }</span>
                            </div>
                            <br></br>
                            <a href="#" className="product-name">{item.name}</a>
                            <br></br>
                            <span>{item.gender}'s {item.color} {item.type}</span>
                            <div className="product-footer">
                                <span>{item.currency} {item.price}</span>
                                <button disabled={item.quantity===0}>Add to cart</button>
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    );
}

export default Products;