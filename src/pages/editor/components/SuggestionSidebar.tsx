const SuggestionSidebar = () => {
  const suggestions = [
    {
      title: 'Optimize dynamic import to improve perceived performance.',
      code: `const ListGamebook = dynamic(() => import("@/components/list-gamebook"), {
  suspense: true,
  loading: () => <p>Loading...</p>, // Add a loading component
});`,
    },
    {
      title:
        'Implement pagination or virtualization to render only visible items.',
      code: `// ... existing code ...
<ListGamebook
  gamebookList={gamebookList.slice(0, 20)} // Show only first 20 items
  // ... other props ...
/>
// ... existing code ...`,
    },
    {
      title:
        'Optimize images to leverage Next.js Image component for automatic optimization.',
      code: null,
    },
    {
      title:
        'Implement caching for data fetching functions to avoid unnecessary refetches.',
      code: `import { cache } from 'react'`,
    },
  ]

  return (
    <div className="card shadow-xl m-4 bg-base-100">
      <div className="card-body">
        <h2 className="card-title">
          Suggest performance improvements for this page.
        </h2>
        <p>
          Here are some suggestions to improve the performance of this page:
        </p>

        <div className="space-y-6 mt-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold">
                {index + 1}. {suggestion.title}
              </h3>

              {suggestion.code && (
                <pre className="bg-gray-50 rounded">
                  <code className="text-sm">{suggestion.code}</code>
                </pre>
              )}

              <div className="flex gap-2 mt-2">
                <button className="btn btn-outline btn-sm">Refer</button>
                <button className="btn btn-primary btn-sm">Apply</button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4">Follow up or further instructions...</p>

        <div className="card-actions mt-4 justify-end">
          <button className="btn btn-outline btn-sm">Refer directory</button>
          <button className="btn btn-primary btn-sm">File-only</button>
        </div>
      </div>
    </div>
  )
}

export default SuggestionSidebar
