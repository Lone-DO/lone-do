import { ref } from 'vue'

export interface iProject {
  /** General */
  baseUrl: string
  config: {
    logo: string,
    elementName: string,
  }
  component: object
  components?: object
  install: () => void
  instance: object | null
  logo: string
  name: string
  /** Plugins */
  router: object
}

export function useProjectStore() {
  const projects = ref(<iProject[]>[])

  async function init() {
    const targets = [await import('@zzz/main.js')]
    const collection = <iProject[]>[]
    targets.forEach((promise) => {
      try {
        /** @ts-expect-error - TODO: Find proper types */
        const { default: project }: iProject = promise
        if (!projects.value.find(({ name = '' }) => name === project.name)) {
          return collection.push(project)
        }
      } catch (error) {
        console.error(error)
      }
    })

    projects.value = collection
  }

  return {
    init,
    projects,
  }
}
