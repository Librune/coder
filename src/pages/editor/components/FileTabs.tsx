const FileTabs = () => {
  const tabs = [
    { name: 'page.tsx', active: true },
    { name: 'bookstore', active: false },
    { name: 'page.tsx', active: false },
    { name: 'app', active: false },
    { name: 'switcher.tsx', active: false },
    { name: 'event', active: false },
  ]

  return (
    <div className="tabs tabs-bordered overflow-x-auto">
      {tabs.map((tab, index) => (
        <a key={index} className={`tab ${tab.active ? 'tab-active' : ''}`}>
          {tab.name}
        </a>
      ))}
    </div>
  )
}

export default FileTabs
