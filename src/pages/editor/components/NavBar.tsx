const NavBar = () => {
  return (
    <div>
      <div className="breadcrumbs text-sm ">
        <ul>
          <li>
            <a>
              <span className="mgc_command_line"></span>
              概览
            </a>
          </li>
          <li>
            <a>
              <span className="mgc_search_line"></span>
              搜索
            </a>
          </li>
          <li>
            <a>
              <span className="mgc_section_line"></span>
              详情
            </a>
          </li>
          <li>
            <a>
              <span className="mgc_rows_3_line"></span>
              目录
            </a>
          </li>
          <li>
            <a>
              <span className="mgc_book_line"></span>
              章节
            </a>
          </li>
          <li>
            <a>
              <span className="mgc_chat_1_line"></span>
              段评
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
