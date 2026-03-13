// pages/portfolio/portfolio.js
Page({
  data: {
    showModal: false,
    previewImageSrc: ''
  },
  onLoad() {
    console.log('技术练习案例页面加载');
  },
  onShow() {
    console.log('技术练习案例页面显示');
  },
  previewImage(e) {
    const src = e.currentTarget.dataset.src;
    this.setData({
      showModal: true,
      previewImageSrc: src
    });
  },
  closeModal() {
    this.setData({
      showModal: false,
      previewImageSrc: ''
    });
  }
})