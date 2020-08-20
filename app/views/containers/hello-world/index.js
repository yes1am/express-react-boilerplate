import React, { Component } from 'react'
// import { Icon } from 'antd'
import './style.less'
import './style.css'

const sections = [
  {
    'itemLink': '##',
    'imgSrc': 'https://placeimg.com/350/350/people/grayscale',
    'poductName': "Carter's1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093",
    'price': '299.06',
    'preferential': '满400减100',
    'activityType': '1小时内热卖5885件',
    'shopLink': '##',
    'activeName': '马上抢！'
  },
  {
    'itemLink': '##',
    'imgSrc': 'https://placeimg.com/350/350/people/grayscale',
    'poductName': "Carter's1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093",
    'price': '299.06',
    'preferential': '满400减100',
    'activityType': '1小时内热卖5885件',
    'shopLink': '##',
    'activeName': '马上抢！'
  },
  {
    'itemLink': '##',
    'imgSrc': 'https://placeimg.com/350/350/people/grayscale',
    'poductName': "Carter's1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093",
    'price': '299.06',
    'preferential': '满400减100',
    'activityType': '1小时内热卖5885件',
    'shopLink': '##',
    'activeName': '马上抢！'
  },
  {
    'itemLink': '##',
    'imgSrc': 'https://placeimg.com/350/350/people/grayscale',
    'poductName': "Carter's1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093",
    'price': '299.06',
    'preferential': '满400减100',
    'activityType': '1小时内热卖5885件',
    'shopLink': '##',
    'activeName': '马上抢！'
  },
  {
    'itemLink': '##',
    'imgSrc': 'https://placeimg.com/350/350/people/grayscale',
    'poductName': "Carter's1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093",
    'price': '299.06',
    'preferential': '满400减100',
    'activityType': '1小时内热卖5885件',
    'shopLink': '##',
    'activeName': '马上抢！'
  },
  {
    'itemLink': '##',
    'imgSrc': 'https://placeimg.com/350/350/people/grayscale',
    'poductName': "Carter's1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093",
    'price': '299.06',
    'preferential': '满400减100',
    'activityType': '1小时内热卖5885件',
    'shopLink': '##',
    'activeName': '马上抢！'
  },
  {
    'itemLink': '##',
    'imgSrc': 'https://placeimg.com/350/350/people/grayscale',
    'poductName': "Carter's1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093",
    'price': '299.06',
    'preferential': '满400减100',
    'activityType': '1小时内热卖5885件',
    'shopLink': '##',
    'activeName': '马上抢！'
  },
  {
    'itemLink': '##',
    'imgSrc': 'https://placeimg.com/350/350/people/grayscale',
    'poductName': "Carter's1年式灰色长袖连体衣包脚爬服全棉鲸鱼男婴儿童装115G093",
    'price': '299.06',
    'preferential': '满400减100',
    'activityType': '1小时内热卖5885件',
    'shopLink': '##',
    'activeName': '马上抢！'
  }
]

class HelloWorld extends Component {
  componentDidMount () {
    this.hello()
  }
  hello = () => {
    console.log(123)
  };
  render = () => {
    return (
      <div class='item-section'>
        <ul>
          {sections.map((item, index) => {
            return <li class='flag' role='link' href={item.shopLink}>
              <a class='figure flag-item' href={item.shopLink}>
                <img src={item.imgSrc} alt='' />
              </a>
              <div class='figcaption flag-item'>
                <div class='flag-title'><a href={item.itemLink} title=''>{item.poductName}</a></div>
                <div class='flag-price'><span>双11价</span><strong>¥{item.price}</strong><small>({item.preferential})</small></div>
                <div class='flag-type'>{item.activityType}</div>
                <a class='flag-btn' >{item.activeName}</a>
              </div>
            </li>
          })}
        </ul>
      </div>
    )
  }
}

export default HelloWorld
