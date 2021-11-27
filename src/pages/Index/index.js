import React from 'react'
import { Carousel, Flex } from 'antd-mobile'
import axios from 'axios'
import FlexItem from "antd-mobile/es/flex/FlexItem";
import './index.css'

import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

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
        path:'/home/list'
    },
]

export default class Index  extends React.Component {
    state = {
       swiper:[],
        isSwiperLoaded:false
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
    componentDidMount() {
        this.getSwiper()
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
                    alt=""
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
            <img src={item.img} alt />
            <h2>{item.title}</h2>
        </FlexItem>)
    }

    render() {
        return (
            <div className="index">
               <div className="swiper">
                   {
                       this.state.isSwiperLoaded?
                           <Carousel
                               autoplay={true}
                               infinite={true}
                               autoplayInterval={2000}
                           >
                               { this.renderSwiper()}
                           </Carousel>:''
                   }
               </div>
                <Flex className="nav">
                    {this.renderNavs()}
                </Flex>

            </div>
        );
    }
}
