use std::cell::RefCell;

use book_core::{Action, BookCore, BookDetail, CatalogVolume, Chapter, Form, MetaData, SearchBook};
use serde_json::Value;
use tauri::AppHandle;

use crate::log::TauriLogger;

thread_local! {
    static BKS: RefCell<Option<BookCore>> = RefCell::new(None);
}

#[tauri::command]
pub fn emit_code(app: AppHandle, code: String) {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        *bks = Some(BookCore::init(code));
        bks.as_mut()
            .unwrap()
            .regist_cust_logger(TauriLogger { app });
    })
}

#[tauri::command]
pub fn get_metadata() -> Result<MetaData, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_metadata()
    })
}

#[tauri::command]
pub fn get_forms() -> Result<Vec<Form>, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_forms()
    })
}

#[tauri::command]
pub fn get_actions() -> Result<Vec<Action>, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_actions()
    })
}

#[tauri::command]
pub fn run_action(action: String) -> Result<Value, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.run_action(action)
    })
}

#[tauri::command]
pub fn search_books(key: String, page: u8, count: u8) -> Result<Vec<SearchBook>, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.search_books(key, page, count)
    })
}

#[tauri::command]
pub fn set_envs(envs: Value) {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.set_envs(envs).unwrap();
    })
}

#[tauri::command]
pub fn get_envs() -> Result<Value, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_envs()
    })
}

#[tauri::command]
pub fn get_book_detail(bid: String) -> Result<BookDetail, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_book_detail(bid)
    })
}

#[tauri::command]
pub fn get_catalog(bid: String) -> Result<Vec<CatalogVolume>, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_catalog(bid)
    })
}

#[tauri::command]
pub fn get_chapter(bid: String, cid: String) -> Result<Chapter, String> {
    BKS.with(|bks| {
        let mut bks = bks.borrow_mut();
        let bks = bks.as_mut().unwrap();
        bks.get_chapter(bid, cid)
    })
}
