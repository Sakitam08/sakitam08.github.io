// pages/message/message.js
Page({
  data: {
    services: [
      { name: '请选择服务类型' },
      { name: '3D建模' },
      { name: '网站搭建' },
      { name: '小程序开发' },
      { name: '远程技术协助' },
      { name: '其他' }
    ],
    serviceIndex: 0,
    loading: false
  },
  onLoad() {
    console.log('在线留言页面加载');
  },
  onShow() {
    console.log('在线留言页面显示');
  },
  bindServiceChange(e) {
    this.setData({
      serviceIndex: e.detail.value
    });
  },
  handleSubmit(e) {
    const formData = e.detail.value;
    
    // 表单验证
    if (!formData.name) {
      wx.showToast({
        title: '请输入您的姓名',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    if (!formData.email) {
      wx.showToast({
        title: '请输入您的邮箱',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
      wx.showToast({
        title: '请输入正确的邮箱格式',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      wx.showToast({
        title: '请输入正确的手机号码格式',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    if (this.data.serviceIndex === 0) {
      wx.showToast({
        title: '请选择服务类型',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    if (!formData.message) {
      wx.showToast({
        title: '请输入需求描述',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    if (formData.message.length < 10) {
      wx.showToast({
        title: '留言内容至少需要10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    if (formData.message.length > 500) {
      wx.showToast({
        title: '留言内容不能超过500个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 设置加载状态
    this.setData({ loading: true });
    
    // 模拟表单提交
    setTimeout(() => {
      console.log('表单数据:', formData);
      
      // 显示成功提示
      wx.showToast({
        title: '留言提交成功！我会尽快联系您。',
        icon: 'success',
        duration: 2000
      });
      
      // 重置表单
      this.setData({
        serviceIndex: 0,
        loading: false
      });
      
      // 清空表单
      const form = e.detail.formId;
      if (form) {
        wx.createSelectorQuery().select('#contactForm').context(function(res) {
          res.context.reset();
        }).exec();
      }
    }, 1000);
  }
})