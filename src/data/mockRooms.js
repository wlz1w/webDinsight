export const mockRooms = [
  {
    id: 1,
    title: '人工智能是否会取代人类工作',
    description: '探讨AI技术发展对就业市场的影响',
    participants: 156,
    status: 'waiting',
    category: '科技',
    difficulty: 'medium',
    maxParticipants: 2,
    currentParticipants: 1
  },
  {
    id: 2,
    title: '远程办公是否比传统办公更高效',
    description: '分析远程工作模式的优势与挑战',
    participants: 89,
    status: 'ongoing',
    category: '职场',
    difficulty: 'easy',
    maxParticipants: 2,
    currentParticipants: 2
  },
  {
    id: 3,
    title: '是否应该实施全民基本收入',
    description: '讨论UBI政策的可行性与影响',
    participants: 234,
    status: 'waiting',
    category: '社会',
    difficulty: 'hard',
    maxParticipants: 2,
    currentParticipants: 1
  },
  {
    id: 4,
    title: '电动汽车是否真的环保',
    description: '从全生命周期角度分析电动汽车的环境影响',
    participants: 112,
    status: 'waiting',
    category: '环保',
    difficulty: 'medium',
    maxParticipants: 2,
    currentParticipants: 0
  },
  {
    id: 5,
    title: '社交媒体是否加剧了社会极化',
    description: '探讨社交平台对公众舆论的影响',
    participants: 178,
    status: 'ongoing',
    category: '社会',
    difficulty: 'medium',
    maxParticipants: 2,
    currentParticipants: 2
  },
  {
    id: 6,
    title: '是否应该禁止基因编辑婴儿',
    description: '讨论基因编辑技术的伦理边界',
    participants: 145,
    status: 'waiting',
    category: '科技',
    difficulty: 'hard',
    maxParticipants: 2,
    currentParticipants: 1
  }
]

export const categories = [
  { id: 'all', name: '全部' },
  { id: 'tech', name: '科技' },
  { id: 'social', name: '社会' },
  { id: 'environment', name: '环保' },
  { id: 'workplace', name: '职场' },
  { id: 'education', name: '教育' }
]
