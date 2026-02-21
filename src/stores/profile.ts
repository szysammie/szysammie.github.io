import { defineStore } from 'pinia'

export interface Link {
  id: number
  title: string
  description: string
  url: string
  icon: string
  color?: string
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
        description: '查看我的开源项目',
        url: 'https://github.com/szysammie',
        icon: 'Github',
        color: '#24292e'
      },
      {
        id: 2,
        title: '博客',
        description: '阅读我的技术文章',
        url: 'https://blog.sammie.vip',
        icon: 'FileText',
        color: '#42b883'
      },
      {
        id: 3,
        title: '小工具',
        description: '实用在线工具集合',
        url: '#',
        icon: 'Wrench',
        color: '#409eff'
      }
    ] as Link[]
  })
})
