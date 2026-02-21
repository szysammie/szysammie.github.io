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
      }
    ] as Link[]
  })
})
