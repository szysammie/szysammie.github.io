import { defineStore } from 'pinia'

export interface Link {
  id: number
  title: string
  description: string
  url: string
  icon: string
  color?: string
  heightClass?: string // Optional height class for irregular grid
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    name: 'Sammie',
    title: 'Full Stack Developer',
    description: '科研和工程的双料特工🕵️',
    avatar: 'https://github.com/szysammie.png', // Placeholder, will be replaced or user can update
    links: [
      {
        id: 1,
        title: 'GitHub',
        description: '查看我的开源项目，这里有各种有趣的实验性项目和开源贡献',
        url: 'https://github.com/szysammie',
        icon: 'Github',
        color: '#6366f1', // Indigo
        heightClass: 'h-64'
      },
      {
        id: 2,
        title: '博客',
        description: '阅读我的技术文章，分享关于前端、后端以及架构设计的思考',
        url: 'https://blog.sammie.vip',
        icon: 'FileText',
        color: '#10b981', // Emerald
        heightClass: 'h-48'
      },
      {
        id: 3,
        title: '小工具',
        description: '实用在线工具集合，包含格式转换、编码解码等日常开发辅助工具',
        url: '#',
        icon: 'Wrench',
        color: '#f59e0b', // Amber
        heightClass: 'h-56'
      },
      {
        id: 4,
        title: '项目展示',
        description: '这里展示了我最近参与的一些商业项目和个人练习作品，涵盖了从移动端到桌面端的全栈开发。',
        url: '#',
        icon: 'Layout',
        color: '#ec4899', // Pink
      },
      {
        id: 5,
        title: '摄影记录',
        description: '在代码之外，我也喜欢用镜头记录生活中的光影瞬间。这是我的摄影作品集。',
        url: '#',
        icon: 'Camera',
        color: '#8b5cf6', // Violet
      },
      {
        id: 6,
        title: '读书笔记',
        description: '分享我的年度书单和一些深度阅读笔记，涵盖技术、哲学与心理学。',
        url: '#',
        icon: 'BookOpen',
        color: '#3b82f6', // Blue
      }
    ] as Link[]
  })
})
