// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // 更新无障碍属性
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded.toString());
});

// 为汉堡菜单添加键盘支持
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});

// 点击导航链接后关闭菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// 复制文本功能
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('复制成功！');
    }).catch(err => {
        // 如果clipboard API失败，使用传统方法
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textarea);
            
            if (success) {
                showToast('复制成功！');
            } else {
                showToast('复制失败，请手动复制');
            }
        } catch (error) {
            showToast('复制失败，请手动复制');
            console.error('复制失败:', error);
        }
    });
}

// 显示提示框
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2700);
}

// 表单提交处理
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.btn-submit');
    const phone = form.phone.value;
    const message = form.message.value;
    
    // 自定义验证
    const email = form.email.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('请输入正确的邮箱格式');
        return;
    }
    
    if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
        showToast('请输入正确的手机号码格式');
        return;
    }
    
    if (message.length < 10) {
        showToast('留言内容至少需要10个字符');
        return;
    }
    
    if (message.length > 500) {
        showToast('留言内容不能超过500个字符');
        return;
    }
    
    // 添加加载状态
    submitButton.classList.add('loading');
    const originalText = submitButton.textContent;
    submitButton.textContent = '提交中';
    submitButton.disabled = true;
    
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // 发送数据到自动接单系统后端API
    fetch('http://127.0.0.1:3001/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            customer: data.name,
            service: {
                '3dmodeling': '3D建模',
                'website': '网站搭建',
                'miniprogram': '小程序开发',
                'techsupport': '电脑维护',
                'other': '其他'
            }[data.service] || '其他',
            price: 0, // 价格由您后续确认
            status: '待接单',
            contact: data.phone || data.email,
            remark: data.message
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('提交失败，请稍后重试');
        }
        return response.json();
    })
    .then(data => {
        console.log('订单创建成功:', data);
        showToast('留言提交成功！我会尽快联系您。');
        form.reset();
    })
    .catch(error => {
        console.error('提交失败:', error);
        showToast('提交失败，请稍后重试');
    })
    .finally(() => {
        // 移除加载状态
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

// 导航栏滚动效果
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 缓存导航栏元素
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar ? navbar.offsetHeight : 70;

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // 滚动到目标元素位置减去导航栏高度，确保内容紧贴导航栏下方
            const offsetTop = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 元素进入视口动画的观察器
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // 元素显示后停止观察，提高性能
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 为服务卡片和作品项添加动画
document.querySelectorAll('.service-card, .portfolio-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
});

// 为图片添加错误处理
function handleImageError(img) {
    img.onerror = null;
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23f0f0f0"/%3E%3Ctext x="50%" y="50%" font-size="16" text-anchor="middle" fill="%23999" dy=".3em"%3E图片加载失败%3C/text%3E%3C/svg%3E';
    img.alt = '图片加载失败';
}

// 为所有图片添加错误处理
document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
        handleImageError(this);
    };
});

// 回到顶部按钮功能
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 图片预览功能
const modal = document.getElementById('imagePreviewModal');
const previewImage = document.getElementById('previewImage');
const closeModal = document.querySelector('.close-modal');

// 为所有案例图片添加点击事件
document.querySelectorAll('.portfolio-image img').forEach(img => {
    img.addEventListener('click', () => {
        modal.classList.add('show');
        previewImage.src = img.src;
        previewImage.alt = img.alt;
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });
});

// 关闭模态框
function closeModalFunc() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // 恢复背景滚动
}

closeModal.addEventListener('click', closeModalFunc);

// 点击模态框背景关闭
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// 键盘Escape键关闭
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModalFunc();
    }
});

// 添加当前年份到页脚
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
} else {
    console.log('Footer year element not found');
}

// 订单提交处理
function handleOrderSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.btn-submit');
    const phone = form.orderPhone.value;
    const description = form.orderDescription.value;
    
    // 自定义验证
    const email = form.orderEmail.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('请输入正确的邮箱格式');
        return;
    }
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
        showToast('请输入正确的手机号码格式');
        return;
    }
    
    if (description.length < 10) {
        showToast('需求描述至少需要10个字符');
        return;
    }
    
    if (description.length > 500) {
        showToast('需求描述不能超过500个字符');
        return;
    }
    
    // 添加加载状态
    submitButton.classList.add('loading');
    const originalText = submitButton.textContent;
    submitButton.textContent = '提交中';
    submitButton.disabled = true;
    
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // 发送数据到自动接单系统后端API
    fetch('http://127.0.0.1:3001/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            customer: data.orderName,
            service: {
                '3dmodeling': '3D建模',
                'website': '网站搭建',
                'miniprogram': '小程序开发',
                'techsupport': '远程技术协助',
                'other': '其他'
            }[data.orderService] || '其他',
            price: 0, // 价格由您后续确认
            status: '待接单',
            contact: data.orderPhone || data.orderEmail,
            remark: data.orderDescription
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('提交失败，请稍后重试');
        }
        return response.json();
    })
    .then(data => {
        console.log('订单创建成功:', data);
        showToast('订单提交成功！我会尽快联系您。');
        form.reset();
    })
    .catch(error => {
        console.error('提交失败:', error);
        showToast('提交失败，请稍后重试');
    })
    .finally(() => {
        // 移除加载状态
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

// 消息发送功能
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = chatInput.value.trim();
    
    if (message) {
        // 添加用户消息
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user-message';
        userMessageDiv.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(userMessageDiv);
        
        // 清空输入框
        chatInput.value = '';
        
        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 模拟回复
        setTimeout(() => {
            const systemMessageDiv = document.createElement('div');
            systemMessageDiv.className = 'message system-message';
            systemMessageDiv.innerHTML = `<p>感谢您的咨询，我会尽快回复您的问题！</p>`;
            chatMessages.appendChild(systemMessageDiv);
            
            // 滚动到底部
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

// 为聊天输入框添加回车键支持
document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});