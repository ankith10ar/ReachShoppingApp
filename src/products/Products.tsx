import React from 'react';
import jsonData from '../assets/catalogue.json'
import { Product, ProductData } from '../models/Product';
import './Products.css'
import productImg from '../assets/product.jpg'
import FilterConfig from '../models/FilterConfig';
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
                //range filter evaluation
                if (rangeFilterTypes.indexOf(filterConf.filterType)>-1) {
                    items = items.filter( (item) => {
                        
                        let values = filterConf.value;
                        return values.reduce( (prev: boolean, curr: string, index:number, values: string[]) => {

                            if (curr.indexOf('+')>-1) {
                                const min = curr.replace("+", "");
                                return prev || (+item[filterConf.filterType]>+min);
                            } else {
                                const min = curr.slice(0, curr.search("-"));
                                const max = curr.slice(curr.search("-")+1);
                                return prev || (+item[filterConf.filterType]>=+min && +item[filterConf.filterType]<=+max);
                            }

                        }, false);
                    });
                    return;
                }   

                //normal filter evaluation  
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