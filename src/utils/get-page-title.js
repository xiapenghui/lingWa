import defaultSettings from '@/settings'
import i18n from '@/lang'

const title = defaultSettings.title || '上海灵娃MES系统'

export default function getPageTitle(key) {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${pageName} - ${title}`
  }
  return `${title}`
}
