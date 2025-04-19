use std::cell::RefCell;

use book_core::BookCore;
use serde_json::Value;

thread_local! {
    static BKS: RefCell<Option<BookCore>> = RefCell::new(None);
}

#[tauri::command]
pub fn emit_code(code: String) {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        *bks = Some(BookCore::init(code, None));
    })
}

#[tauri::command]
pub fn get_metadata() -> Result<String, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_metadata()
    })
}

#[tauri::command]
pub fn get_form() -> Result<String, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_form()
    })
}

#[tauri::command]
pub fn search_books(key: String, page: u8, count: u8) -> Result<Value, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.search_books(key, page, count)
    })
}

// #[tauri::command]
// pub fn set_env(uuid: String, env: HashMap<String, String>) {
//     book_core::set_env(uuid, env);
// }

// #[tauri::command]
// pub fn run_action(uuid: String, action: String) -> Result<Value, String> {
//     book_core::run_action(uuid, action)
// }

#[tauri::command]
pub fn get_book_detail(bid: String) -> Result<Value, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_book_detail(bid)
    })
}

#[tauri::command]
pub fn get_catalog(bid: String) -> Result<Value, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_catalog(bid)
    })
}

#[tauri::command]
pub fn get_chapter(bid: String, cid: String) -> Result<Value, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_chapter(bid, cid)
    })
}
