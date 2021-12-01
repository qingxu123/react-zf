import React from 'react'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile'
import axios from 'axios'
import FlexItem from "antd-mobile/es/flex/FlexItem";
import './index.scss'

import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
import {getCurrentCity} from "../../utils";

const navs =[
    {
        id:1,
        img:Nav1,
        title:'整租',
        path:'/home/list'
    },
    {
        id:2,
        img:Nav2,
        title:'合租',
        path:'/home/list'
    },
    {
        id:3,
        img:Nav3,
        title:'地图找房',
        path:'/map'
    },
    {
        id:4,
        img:Nav4,
        title:'去出租',
        path:'/home/rent'
    },
]

export default class Index  extends React.Component {
    state = {
       swiper:[],
        isSwiperLoaded:false,
        groups:[],
        news:[],
        curCityName: '上海'
    }
    async getSwiper(){
        const res = await axios.get('http://localhost:8080/home/swiper')
        this.setState( ()=>{
            return{
                swiper: res.data.body,
                isSwiperLoaded:true
            }
        })
    }
    async getGroups (){
        const res = await axios.get('http://localhost:8080/home/groups',{
            params: {
                area: 'area=AREA%7C88cff55c-aaa4-e2e0'
            }
        })
        this.setState( ()=>{
            return {
                groups: res.data.body
            }
        })
    }
    async getNews () {
        const res = await axios.get('http://localhost:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0')
        this.setState( ()=>{
            return {
                news: res.data.body
            }
        })
    }
    async componentDidMount() {
        this.getSwiper()
        this.getGroups()
        this.getNews()
        const curCity = await getCurrentCity()
        this.setState({
            curCityName: curCity.label
        })
    }
    renderSwiper (){
        return this.state.swiper.map(item => (
            <a
                key={item.id}
                href="http://www.react.com"
                style={{ display: 'inline-block', width: '100%', height: 212}}
            >
                <img
                    src={`http://localhost:8080${item.imgSrc}`}
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        this.setState({ imgHeight: 'auto' });
                    }}
                />
            </a>
        ))
    }
    renderNavs() {
        return navs.map(item => <FlexItem key={item.id} onClick={()=> this.props.history.push(item.path)}>
            <img src={item.img} />
            <h2>{item.title}</h2>
        </FlexItem>)
    }
    renderNews() {
        return this.state.news.map(item => (
            <div className="news-item" key={item.id}>
                <div className="imgwrap">
                    <img className="img" src={`http://localhost:8080${item.imgSrc}`}/>
                </div>
                <Flex className="content" direction="column" justify={"center"}>
                    <h3 className={"title"}>{item.title}</h3>
                    <Flex className={"info"} justify={"between"}>
                        <span>{item.from}</span>
                        <span>{item.data}</span>
                    </Flex>
                </Flex>
            </div>
        ))
    }

    render() {
        return (
            <div className="index">

               <div className="swiper">
                   {
                       this.state.isSwiperLoaded?(
                           <Carousel
                               autoplay={true}
                               infinite={true}
                               autoplayInterval={2000}
                           >
                               { this.renderSwiper()}
                           </Carousel>):('')
                   }
                   <Flex className={"search-box"}>
                       <Flex className={"search"}>

                           <div className={"location"}
                                onClick={()=> this.props.history.push('/cityList')}>
                               <span className={"name"}>{this.state.curCityName}</span>
                               <i className={"iconfont icon-arrow"}></i>
                           </div>

                           <div className={"form"}
                                onClick={()=> this.props.history.push('/search')}>
                               <i className={"iconfont icon-seach"}></i>
                               <span className={"text"}>请输入小区或地址</span>
                           </div>
                       </Flex>
                       <i className={"iconfont icon-map"}
                          onClick={()=> this.props.history.push('/map')}></i>
                   </Flex>
               </div>

                <Flex className="nav">
                    {this.renderNavs()}
                </Flex>

                <div className="group">
                    <h3 className="group-title">
                        租房小组<span className="more">更多</span>
                    </h3>
                    <Grid
                        square = {false}
                        hasLine={false}
                        data={this.state.groups}
                        columnNum={2}
                        renderItem={(item)=>(<Flex
                        className="group-item"
                        justify="around"
                        key={item.id}
                    >
                        <div className="desc">
                            <p className="title">{item.title}</p>
                            <span className="info">{item.desc}</span>
                        </div>
                        <img
                            src={`http://localhost:8080${item.imgSrc}`}
                        ></img>
                    </Flex>)} />
                </div>

                <div className="news">
                    <h3 className="group-title">最新资讯</h3>
                    <WingBlank size="md">{this.renderNews()}</WingBlank>
                </div>
            </div>
        );
    }
}
