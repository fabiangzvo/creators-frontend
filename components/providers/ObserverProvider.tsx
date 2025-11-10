import  { useContext, createContext, ComponentType } from 'react'

const ObserverContext = createContext<Record<string, any>>({})

const ObserverProvider = ObserverContext.Provider 

const useObserver = () => useContext(ObserverContext)

function ObserverConsumer(Component: ComponentType) {
  return function Wrapper(props: any) {
    return (
      <ObserverContext.Consumer>
        {(value) => <Component {...props} observer={value} />}
      </ObserverContext.Consumer>
    )
  }
}

export { useObserver, ObserverConsumer, ObserverProvider }
