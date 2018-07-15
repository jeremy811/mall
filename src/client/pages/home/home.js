// pages/home/home.js

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [], // 商品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getProductList(){
    wx.showLoading({
      title: '商品数据加载中',
    })
    qcloud.request({
      url: config.service.productList,
      success: result => {
        wx.hideLoading()
        console.log(result)
        if(result.data.code == 0){
          this.setData({
            productList:result.data.data
          })
        }
        else{
          wx.hideLoading()
          wx.showToast({
            title: '系统服务异常，请稍后重试',
          })
        }
      },
      fail: result => {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
        })
      }
    })
  },

  addToTrolley(event) {
    let productId = event.currentTarget.dataset.id
    let productList = this.data.productList
    let product
    for (let i = 0, len = productList.length; i < len; i++) {
      if (productList[i].id === productId) {
        product = productList[i]
          break
      }
    }

    if (product) {
      qcloud.request({
      url: config.service.addTrolley,
        login: true,
        method: 'PUT',
        data: {
          id: productId
        },
        success: result => {
          let data = result.data
            if (!data.code) {
              wx.showToast({
              title: '已添加到购物车',
              })
            } else {
              wx.showToast({
              icon: 'none',
              title: '添加到购物车失败',
              })
            }
        },
        fail: () => {
          wx.showToast({
            icon: 'none',
            title: '添加到购物车失败',
            })
        }
      })
    }
  }
})