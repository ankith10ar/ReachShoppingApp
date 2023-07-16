import React from 'react';
import { Product } from '../models/Product';
import './Filter.css';
import jsonData from '../assets/catalogue.json'
import FilterConfig from '../models/FilterConfig';


const items: Product[] = jsonData as unknown as Product[]; 

const filterTypes: string[] = ["type", "color", "gender"];
export const rangeFilterTypes: string[] = ["price"]

interface FilterType {
    name: string;
    values: Map<string, number>;
}

function defaultReducingFunction(previousVal: Map<string, number>, currVal: string, currIndex: number, items: string[]) {
    if (previousVal.has(currVal)) {
        previousVal.set(currVal, previousVal.get(currVal) as number + 1);
    } else {
        previousVal.set(currVal, 1);
    }
    return previousVal;
}

function Filter(props: { filterConfig: FilterConfig[]; setFilterConfig: any; }) {

    let { filterConfig, setFilterConfig } = props;

    let filters = filterTypes.map((filterType: string):FilterType => {

        let filterValues: Map<string, number> = items
        .map((item: Product) => item[filterType].toString().toLowerCase())
        .reduce(defaultReducingFunction, new Map<string, number>());
        
        return {
            name: filterType, 
            values: filterValues
        }
    });


    let rangeFilters = rangeFilterTypes.map((rangeFilterType: string): FilterType => {
        let max = items
        .map((item: Product) => item[rangeFilterType])
        .reduce( (previousVal, currVal, currIndex, items):number => +currVal>+previousVal ? +currVal: +previousVal, 0 as number);
        
        max = +max;

        let rangeGap = Math.round((max/3)/10)*10;

        let val = rangeGap;
        let rangeValues = new Map<number, number>();
        while (val < max) {
            rangeValues.set(val,0);
            val+=rangeGap;
        }
        rangeValues.set(max, 0);

        items.forEach((item: Product) => {
            let val = item[rangeFilterType];
            Array.from(rangeValues.keys()).every((key) => {
                if (+val<=key) {
                    rangeValues.set(key, (rangeValues.get(key) as number) +1);
                    return false;
                }
                return true;
            })
        });

        let rangeFilterValues = new Map<string, number>();
        let startRange = 0;
        let prevKey: number;
        Array.from(rangeValues.keys()).forEach((key: number) => {
            let newKey;
            if (key===max) {
                newKey = prevKey.toString() + "+";
            } else {
                newKey = startRange + "-" + key.toString();
            }
            rangeFilterValues.set(newKey, rangeValues.get(key) as number);
            // console.log(rangeValues.get(key) as number);
            startRange += rangeGap + ((startRange === 0)? 1: 0);
            prevKey = key;
        });

        return {
            name: rangeFilterType,
            values: rangeFilterValues
        }
    });

    

    filters = [...filters, ...rangeFilters];


    function capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function onFilterSet(filterName: string, filterKey: string, filterValue: boolean) {
        if (filterValue) {
            let filterConfObj = filterConfig.find((filterConf) => filterConf.filterType===filterName);
            if (filterConfObj) {
                filterConfObj.value.push(filterKey);
            } else {
                filterConfObj = { filterType: filterName, value: [filterKey] } as FilterConfig;
                filterConfig.push(filterConfObj)
            }
        } else {
            let filterConfObj = filterConfig.find((filterConf) => filterConf.filterType===filterName);
            if (filterConfObj) {
                const index = filterConfObj.value.indexOf(filterKey);
                if (index > -1) {
                    filterConfObj.value.splice(index, 1);
                }
            }
        }
        setFilterConfig(Object.assign([], filterConfig));
        // console.log(filterConfig);
    }

    return (
        <div>
            {filters.map( (filter: FilterType) => {
                return ( 
                    <div key={filter.name} className="filter">
                        <h4>{capitalizeFirstLetter(filter.name)}</h4>
                        <>
                            {Array.from(filter.values.keys()).map((key) => {
                                return (
                                    <label key={key}>
                                        <input className="filter-value" 
                                                key={key} 
                                                type="checkbox" 
                                                id={key.toString()}     
                                                onChange={ (e) => onFilterSet(filter.name, key, e.target.checked)}/> 
                                        {capitalizeFirstLetter(key.toString())} 
                                        <span className="filter-quantity">&ensp;({filter.values.get(key)})</span>
                                        <br/>
                                    </label>
                                );
                            })}
                        </>
                    </div>
                )
            })}
        </div>
    )
}

export default Filter;
