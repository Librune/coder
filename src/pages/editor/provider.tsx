import { Form, MetaData } from '@/libs/declare'
import { listen } from '@tauri-apps/api/event'
import { log } from 'console'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'

// export type EditorProviderContextType = {
//   code: string
//   uuid?: string
//   setCode: (code: string) => void
//   setUuid: (uuid: string) => void
// }

// export type EditorProviderProps = {}

// const EditorProviderContext = createContext<EditorProviderContextType>({
//   code: '',
//   setCode: () => {},
//   setUuid: () => {},
// })

// const useEditor = () => useContext(EditorProviderContext)

// const EditorProvider = ({
//   children,
// }: PropsWithChildren<EditorProviderProps>) => {
//   const [code, setCode] = useState<string>('')
//   const [uuid, setUuid] = useState<string>('')
//   const contextValue = useMemo(
//     () => ({
//       code,
//       setCode,
//       uuid,
//       setUuid,
//     }),
//     [code, uuid]
//   )
//   return (
//     <EditorProviderContext.Provider value={contextValue}>
//       <PreviewProvider>{children}</PreviewProvider>
//     </EditorProviderContext.Provider>
//   )
// }

// export default EditorProvider

// export { useEditor }

export type PreviewProviderContextType = {
  metadata?: MetaData
  forms?: Form[]
  actions?: any[]
  searchKey?: string
  searchResult?: any[]
  bid?: string
  bookDetail?: any
  catalog?: any[]
  cid?: string
  chapter?: any
}

const PreviewProviderContext = createContext<
  PreviewProviderContextType | undefined
>(undefined)

const priviewReducer = (
  state: PreviewProviderContextType,
  action: any
): PreviewProviderContextType => {
  switch (action.type) {
    case 'SET_METADATA':
      return { ...state, metadata: action.payload }
    case 'SET_FORM':
      return { ...state, forms: action.payload }
    case 'SET_ACTIONS':
      return { ...state, actions: action.payload }
    case 'SET_SEARCH_KEY':
      return { ...state, searchKey: action.payload }
    case 'SET_SEARCH_RESULT':
      return { ...state, searchResult: action.payload }
    case 'SET_BOOK_ID':
      return { ...state, bid: action.payload }
    case 'SET_BOOK_DETAIL':
      return { ...state, bookDetail: action.payload }
    case 'SET_CATALOG':
      return { ...state, catalog: action.payload }
    case 'SET_CHAPTER_ID':
      return { ...state, cid: action.payload }
    case 'SET_CHAPTER':
      return { ...state, chapter: action.payload }
    default:
      return state
  }
}

type PreviewActions = {
  setMetadata: (metadata: MetaData) => void
  setForm: (form: Form[]) => void
  setActions: (actions: any[]) => void
  setSearchKey: (key: string) => void
  setSearchResult: (result: any[]) => void
  setBid: (bid: string) => void
  setBookDetail: (bookDetail: any) => void
  setCatalog: (catalog: any[]) => void
  setCid: (chapcidterId: string) => void
  setChapter: (chapter: any) => void
}

export const usePreview = () => {
  const context = useContext(PreviewProviderContext)
  if (!context) {
    throw new Error('usePreview must be used within a PreviewProvider')
  }
  return context
}

const PreviewActionsContext = createContext<PreviewActions>({
  setMetadata: () => {},
  setForm: () => {},
  setActions: () => {},
  setSearchKey: () => {},
  setSearchResult: () => {},
  setBid: () => {},
  setBookDetail: () => {},
  setCatalog: () => {},
  setCid: () => {},
  setChapter: () => {},
})

export const usePreviewActions = () => {
  const context = useContext(PreviewActionsContext)
  if (!context) {
    throw new Error('usePreviewActions must be used within a PreviewProvider')
  }
  return context
}

const EditorProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(priviewReducer, {
    metadata: undefined,
    forms: undefined,
    actions: undefined,
    searchKey: '',
    searchResult: [],
    bookDetail: undefined,
    catalog: undefined,
    cid: '',
    chapter: undefined,
  })

  const actions = useMemo(
    () => ({
      setMetadata: (metadata: MetaData) =>
        dispatch({ type: 'SET_METADATA', payload: metadata }),
      setForm: (form: Form[]) => dispatch({ type: 'SET_FORM', payload: form }),
      setActions: (actions: any[]) =>
        dispatch({ type: 'SET_ACTIONS', payload: actions }),
      setSearchKey: (key: string) =>
        dispatch({ type: 'SET_SEARCH_KEY', payload: key }),
      setSearchResult: (result: any[]) =>
        dispatch({ type: 'SET_SEARCH_RESULT', payload: result }),
      setBid: (bid: string) => dispatch({ type: 'SET_BOOK_ID', payload: bid }),
      setBookDetail: (bookDetail: any) =>
        dispatch({ type: 'SET_BOOK_DETAIL', payload: bookDetail }),
      setCatalog: (catalog: any[]) =>
        dispatch({ type: 'SET_CATALOG', payload: catalog }),
      setCid: (cid: string) =>
        dispatch({ type: 'SET_CHAPTER_ID', payload: cid }),
      setChapter: (chapter: any) =>
        dispatch({ type: 'SET_CHAPTER', payload: chapter }),
    }),
    [dispatch]
  )

  return (
    <PreviewProviderContext.Provider value={state}>
      <PreviewActionsContext.Provider value={actions}>
        {children}
      </PreviewActionsContext.Provider>
    </PreviewProviderContext.Provider>
  )
}

export default EditorProvider
