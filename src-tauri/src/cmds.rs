use std::cell::RefCell;

use book_core::BookCore;
use serde_json::Value;
use tauri::{AppHandle, Emitter};

use crate::log::TauriLogger;

thread_local! {
    static BKS: RefCell<Option<BookCore>> = RefCell::new(None);
}

#[tauri::command]
pub fn emit_code(app: AppHandle, code: String) {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        *bks = Some(BookCore::init(code, None));
        bks.as_mut()
            .unwrap()
            .regist_cust_logger(TauriLogger { app });
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
pub fn get_forms() -> Result<String, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_forms()
    })
}

#[tauri::command]
pub fn get_actions() -> Result<String, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_actions()
    })
}

#[tauri::command]
pub fn run_action(action: String) -> Result<String, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.run_action(action)
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
