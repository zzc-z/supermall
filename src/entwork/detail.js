import { request } from "./request"
//传参
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
//进行一个数据的整合  导出  因为数据据来源不同
export class Goods {
    constructor(itemInFo, columns, services) {
        this.title = itemInFo.title
        this.desc = itemInFo.desc
        this.newPrice = itemInFo.price
        this.oldPrice = itemInFo.oldPrice
        this.columns = columns
        this.services = services
        this.realPrice = itemInFo.lowNowPrice
        this.desc=itemInFo.desc
        this.discount=itemInFo.discountDesc
        this.discountBgColor=itemInFo.discountBgColor
    }
}

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}

export function getRecommend() {
    return request({
        url: '/recommend'
    })
}