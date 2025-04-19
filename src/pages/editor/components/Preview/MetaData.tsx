import { usePreview } from '../../provider'

const MetaData = () => {
  const { metadata } = usePreview()
  return (
    <div className="card">
      {!metadata ? (
        <></>
      ) : (
        <div className="p-4">
          <div className="flex items-center mb-3">
            <div className="badge badge-neutral">书源信息</div>
          </div>
          <div className="space-y-1.5 text-sm mt-2">
            <div className="flex items-start font-mono text-xs break-all ">
              <div className="font-bold">名称：</div>
              <div>{metadata?.name}</div>
            </div>
            <div className="flex items-start font-mono text-xs break-all ">
              <div className="font-bold">作者：</div>
              <div>{metadata?.author}</div>
            </div>
            <div className="flex items-start font-mono text-xs break-all ">
              <div className="font-bold">UUID：</div>
              <div>{metadata?.uuid}</div>
            </div>
            <div className="flex items-start font-mono text-xs break-all ">
              <div className="font-bold">基础地址：</div>
              <div>{metadata?.baseUrl}</div>
            </div>
            <div className="flex items-start font-mono text-xs break-all ">
              <div className="font-bold flex-shrink-0 ">用户代理：</div>
              <div>{metadata?.userAgent}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MetaData
