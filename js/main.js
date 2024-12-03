document.querySelectorAll('.watch-video-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const videoSrc = button.getAttribute('data-video');
        console.log('点击播放视频:', videoSrc);
        
        const modal = document.getElementById('videoModal');
        const modalVideo = document.getElementById('modalVideo');
        
        if (modal && modalVideo) {
            // 重置视频
            modalVideo.pause();
            modalVideo.currentTime = 0;
            
            // 设置新的视频源
            modalVideo.src = videoSrc;
            console.log('设置视频源:', videoSrc);
            
            // 加载视频
            modalVideo.load();
            
            // 显示模态框
            modal.style.display = 'block';
            modal.classList.add('active');
            
            // 视频加载完成后设置尺寸
            modalVideo.addEventListener('loadedmetadata', function() {
                console.log('视频元数据加载完成', {
                    duration: this.duration,
                    videoWidth: this.videoWidth,
                    videoHeight: this.videoHeight,
                    readyState: this.readyState
                });
                
                // 强制设置视频尺寸
                this.style.width = '100%';
                this.style.height = 'auto';
                this.style.maxWidth = '1280px'; // 或其他合适的最大宽度
                
                // 确保视频显示
                this.style.display = 'block';
                this.style.visibility = 'visible';
            });
            
            // 尝试播放视频
            modalVideo.play().catch(error => {
                console.error('视频播放失败:', error);
            });
        }
    });
});

// 视频预览功能
document.querySelectorAll('.preview-video').forEach(video => {
    // 鼠标悬停时播放预览
    video.addEventListener('mouseenter', () => {
        video.play();
    });
    
    // 鼠标离开时暂停预览
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

// 确保DOM加载完成后再添加事件监听器
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成');
    
    // 视频播放按钮点击事件
    const videoButtons = document.querySelectorAll('.watch-video-btn');
    console.log('找到的视频按钮数量:', videoButtons.length);
    
    videoButtons.forEach(button => {
        button.addEventListener('click', async function(e) {  // 添加 async
            e.preventDefault();
            e.stopPropagation();
            
            const videoSrc = this.getAttribute('data-video');
            console.log('点击播放视频:', videoSrc);
            
            const modal = document.getElementById('videoModal');
            const modalVideo = document.getElementById('modalVideo');
            
            if (!modal || !modalVideo) {
                console.error('未找到模态框或视频元素');
                return;
            }
            
            // 重置视频
            try {
                await modalVideo.pause();  // 等待暂停完成
                modalVideo.currentTime = 0;
                modalVideo.src = videoSrc;
                
                // 显示模态框
                modal.style.display = 'block';
                modal.classList.add('active');
                
                // 等待视频加载
                modalVideo.load();
                
                // 等待元数据加载完成
                await new Promise((resolve) => {
                    modalVideo.addEventListener('loadedmetadata', resolve, { once: true });
                });
                
                // 尝试播放视频
                await modalVideo.play();
                console.log('视频开始播放');
                
            } catch (error) {
                console.error('视频操作失败:', error);
            }
        });
    });
    
    // 关闭按钮事件
    const closeButton = document.querySelector('.video-modal .close-modal');
    if (closeButton) {
        closeButton.addEventListener('click', async function() {  // 添加 async
            const modal = document.getElementById('videoModal');
            const modalVideo = document.getElementById('modalVideo');
            
            if (modal && modalVideo) {
                try {
                    await modalVideo.pause();  // 等待暂停完成
                    modal.classList.remove('active');
                    setTimeout(() => {
                        modal.style.display = 'none';
                        modalVideo.currentTime = 0;
                    }, 300);
                } catch (error) {
                    console.error('关闭视频时出错:', error);
                }
            }
        });
    }
    
    // 点击模态框背景关闭
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.addEventListener('click', async function(e) {  // 添加 async
            if (e.target === this) {
                const modalVideo = document.getElementById('modalVideo');
                if (modalVideo) {
                    try {
                        await modalVideo.pause();  // 等待暂停完成
                        this.classList.remove('active');
                        setTimeout(() => {
                            this.style.display = 'none';
                            modalVideo.currentTime = 0;
                        }, 300);
                    } catch (error) {
                        console.error('关闭视频时出错:', error);
                    }
                }
            }
        });
    }
    
    // 添加视频事件监听
    const modalVideo = document.getElementById('modalVideo');
    if (modalVideo) {
        modalVideo.addEventListener('play', () => {
            console.log('视频开始播放');
        });
        
        modalVideo.addEventListener('pause', () => {
            console.log('视频已暂停');
        });
        
        modalVideo.addEventListener('error', (e) => {
            console.error('视频错误:', e.target.error);
        });
        
        modalVideo.addEventListener('loadedmetadata', function() {
            console.log('视频元数据加载完成', {
                duration: this.duration,
                videoWidth: this.videoWidth,
                videoHeight: this.videoHeight,
                readyState: this.readyState
            });
            
            // 设置合适的视频尺寸
            this.style.maxWidth = '90vw';
            this.style.maxHeight = '90vh';
            this.style.width = 'auto';
            this.style.height = 'auto';
        });
    }
    
    // 服务案例筛选功能
    const caseFilterButtons = document.querySelectorAll('.cases-filter .filter-btn');
    const caseCards = document.querySelectorAll('.case-card');
    
    caseFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            caseFilterButtons.forEach(btn => btn.classList.remove('active'));
            // 给当前点击的按钮添加active类
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            caseCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // AI艺术库筛选和动画效果
    const galleryFilterButtons = document.querySelectorAll('.gallery-filter .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // 添加进入动画
    function animateGalleryItems() {
        galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // 初始化动画
    animateGalleryItems();
    
    // 筛选功能
    galleryFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有active类
            galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // 重新触发动画
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
    
    // 音频播放控制
    const audioCards = document.querySelectorAll('.audio-card');
    
    audioCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        const audio = card.querySelector('audio');
        
        playButton.addEventListener('click', () => {
            if (audio.paused) {
                // 暂停所有其他音频
                document.querySelectorAll('audio').forEach(a => {
                    if (a !== audio) a.pause();
                });
                audio.play();
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audio.pause();
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        // 监听音频播放结束
        audio.addEventListener('ended', () => {
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        });
    });
    
    // 获取AI画境按钮
    const defaultButton = document.querySelector('.filter-btn[data-filter="ai-image"]');
    
    // 触发点击事件，默认显示AI画境
    if (defaultButton) {
        defaultButton.click();
    }
    
    // 初始化时隐藏非AI画境的内容
    galleryItems.forEach(item => {
        if (item.getAttribute('data-category') !== 'ai-image') {
            item.style.display = 'none';
        }
    });
    
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active'); // 确保添加了active类
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextSlide() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }

    // 点击事件监听
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // 点击圆点切换幻灯片
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });

    // 自动播放控制
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000); // 每5秒切换一次
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // 鼠标悬停时暂停自动播放
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startInterval();
    });

    // 初始化显示和自动播放
    showSlide(0);
    startInterval();
});

// 图片查看功能
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
// 移除 modalTitle 和 modalDescription，因为不需要显示文字内容
// const modalTitle = document.getElementById('modalTitle');
// const modalDescription = document.getElementById('modalDescription');

// 为所有查看大图按钮添加点击事件
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const galleryCard = this.closest('.gallery-card');
        const img = galleryCard.querySelector('img');

        // 只设置模态框中的大图为点击的图片
        modalImage.src = img.src;

        // 显示模态框
        imageModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// 关闭模态框
document.querySelector('.close-modal').addEventListener('click', () => {
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// 点击模态框外部关闭
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ESC键关闭模态框
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.style.display === 'block') {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// 阻止图片点击事件冒泡
document.querySelector('.modal-image-container').addEventListener('click', function(e) {
    e.stopPropagation();
});

// 服务案例图片查看功能
document.querySelectorAll('.case-image').forEach(caseImage => {
    const viewBtn = caseImage.querySelector('.view-btn');
    const img = caseImage.querySelector('img');
    
    // 点击按钮查看大图
    viewBtn?.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        openImageModal(img);
    });
    
    // 点击图片区域也可以查看大图
    caseImage.addEventListener('click', function() {
        openImageModal(img);
    });
});

// 封装打开模态框的函数
function openImageModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImg.src = img.src;
    modalTitle.textContent = img.alt;
    modalDescription.textContent = img.getAttribute('data-description') || '';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 添加到main.js
document.querySelector('video[src*="hunan"]').addEventListener('loadedmetadata', function() {
    console.log('Video metadata loaded:', {
        videoWidth: this.videoWidth,
        videoHeight: this.videoHeight,
        duration: this.duration,
        readyState: this.readyState
    });
});

// 添加错误监听
document.querySelector('video[src*="hunan"]').addEventListener('error', function() {
    console.error('Video error:', this.error);
});

function scrollToProduct(productTitle) {
    const productCards = document.querySelectorAll('.product-card h3');
    for (let card of productCards) {
        if (card.textContent.trim() === productTitle) {
            card.scrollIntoView({ behavior: 'smooth' });
            break;
        }
    }
}

function scrollToGalleryCategory(category) {
    // 滚动到AI艺术工坊区域
    document.getElementById('ai-gallery').scrollIntoView({ behavior: 'smooth' });
    
    // 延迟执行以确保滚动完成
    setTimeout(() => {
        // 找到对应类别的按钮并触发点击
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            if (button.getAttribute('data-filter') === category) {
                button.click();
            }
        });
    }, 800);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 

// 显示文旅大模型弹窗函数
function showPopupWenlv() {
    document.getElementById('popup-wenlv').style.display = 'block';
}

// 关闭文旅大模型弹窗函数
function closePopupWenlv() {
    document.getElementById('popup-wenlv').style.display = 'none';
}

function showPopupXue() {
    document.getElementById('popup-xue').style.display = 'block';
}

function closePopupXue() {
    document.getElementById('popup-xue').style.display = 'none';
}