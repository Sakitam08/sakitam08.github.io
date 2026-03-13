// pages/contact/contact.js
Page({
  data: {
  },
  onLoad() {
    console.log('联系方式页面加载');
  },
  onShow() {
    console.log('联系方式页面显示');
  },
  copyText(e) {
    const text = e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success(res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail(res) {
        wx.showToast({
          title: '复制失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
})