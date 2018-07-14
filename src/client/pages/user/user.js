// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType
/*    
    userInfo: {
      nickName: "优达学城",
      avatarUrl: "", // 头像 URL 地址
    }, // 虚拟数据
*/    
  },
  
  onTapAddress() {
    wx.showToast({
      icon: 'none',
      title: '此功能暂未开放'
    })
  },
  
  onTapKf() {
    wx.showToast({
      icon: 'none',
          title: '此功能暂未开放'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  onTapLogin: function(){
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 同步授权状态
    this.setData({
      locationAuthType: app.data.locationAuthType
    })
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
})