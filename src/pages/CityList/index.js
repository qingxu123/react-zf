import React from 'react'
import { NavBar, Toast } from 'antd-mobile'
import axios from "axios";

import {List, AutoSizer} from 'react-virtualized'



import './index.scss'
import {getCurrentCity} from '../../utils'

const HOUSE_CITY = ["北京","上海","广州","深圳"]


const formatCityData = (list) =>{
    const cityList = {}
    list.forEach(item =>{
        const first = item.short.substr(0,1)
        if(cityList[first]) {
            cityList[first].push(item)
        }else {
            cityList[first] = [item]
        }
    })
    const cityIndex = Object.keys(cityList).sort()

    return {
        cityList,
        cityIndex
    }
}

const TITLE_HEIGHT = 36
const NAME_HEIGHT = 50

const formatCityIndex = letter => {
    switch (letter) {
        case '#':
            return '当前定位'
        case 'hot':
            return '热门城市'
        default:
            return letter.toUpperCase()
            break
    }
}

export default class CityList extends React.Component {
    state = {
        cityIndex: [],
        cityList: {},
        activeIndex: 0
    }

    componentDidMount() {
        this.getCityList()
    }

    async getCityList () {
        const res = await axios.get('http://localhost:8080/area/city?level=1')
        const {cityList, cityIndex} = formatCityData(res.data.body)

        const hots =await axios.get('http://localhost:8080/area/hot')
        cityList['hot'] = hots.data.body
        cityIndex.unshift('hot')

        const curCity = await getCurrentCity()
        cityList['#'] =[curCity]
        cityIndex.unshift('#')

        this.setState(()=>{
            return{
                cityIndex,
                cityList
            }
        })
    }

    rowRenderer = ({
    key,
    index,
    isScrolling,
    isVisible,
    style,
    }) => {
        const {cityIndex, cityList} = this.state
         const letter = cityIndex[index]

        return (
            <div key={key} style={style} className={"city"}>
               <div className={"title"}>{formatCityIndex(letter)}</div>
                <div className={"name"} >
                    {cityList[letter].map(item => (
                        <div className={"name"} key={item.value} onClick={()=>this.changeCity(item)}>{item.label}</div>
                    ))}
                </div>
            </div>
        )
    }

    changeCity({label, value}){
        console.log(label,value)
        if(HOUSE_CITY.indexOf(label) > -1){
            localStorage.setItem('zf_city', JSON.stringify({label,value}))
            this.props.history.go(-1)
        }else {
            Toast.info('该城市暂无房源数据',1,null,false)
        }
    }

    getRowHeight = ({index}) => {
        const { cityList,cityIndex } = this.state
        return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    }

    renderCityIndex() {
        const {cityIndex, activeIndex } = this.state
        return cityIndex.map((item,index) =>(
            <li className={"city-index-item"} key={item}>
            <span className={activeIndex === index? "index-active" : ''}>
                {item === 'hot'? '热': item.toUpperCase()}
            </span>
        </li>))
    }
    onRowsRendered = ({startIndex}) =>{
        if(this.state.activeIndex !== startIndex){
            this.setState({
                activeIndex: startIndex
            })
        }
    }

    render() {
        return <div className={"citylist"}>
            <NavBar
                className={"navbar"}
                mode="light"
                icon={<i className={"iconfont icon-back"}></i>}
                onLeftClick={() => this.props.history.go(-1)}
            >城市选择</NavBar>

            <AutoSizer>
                {({ width, height}) => (
                    <List
                        width={width}
                        height={height}
                        rowCount={this.state.cityIndex.length}
                        rowHeight={this.getRowHeight}
                        rowRenderer={this.rowRenderer}
                        onRowsRendered={this.onRowsRendered}
                    />
                )}
            </AutoSizer>

            <ul className={"city-index"}>
                {this.renderCityIndex()}
            </ul>
        </div>
    }
}
