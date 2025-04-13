use std::collections::HashMap;

use serde_json::Value;

#[tauri::command]
pub fn script_exec(code: String) -> Result<String, String> {
    book_core::js_eval(code)
}

#[tauri::command]
pub fn emit_code(code: String) -> String {
    book_core::add_script(code)
}

#[tauri::command]
pub fn get_metadata(uuid: Option<String>, code: Option<String>) -> Result<String, String> {
    book_core::get_metadata(uuid, code)
}

#[tauri::command]
pub fn get_form(uuid: Option<String>, code: Option<String>) -> Result<String, String> {
    book_core::get_form(uuid, code)
}

#[tauri::command]
pub fn search_books(uuid: String, key: String, page: u8, count: u8) -> Result<Value, String> {
    book_core::search_books(uuid, key, page, count)
}

#[tauri::command]
pub fn set_env(uuid: String, env: HashMap<String, String>) {
    book_core::set_env(uuid, env);
}

#[tauri::command]
pub fn run_action(uuid: String, action: String) -> Result<Value, String> {
    book_core::run_action(uuid, action)
}

#[tauri::command]
pub fn get_book_detail(uuid: String, bid: String) -> Result<Value, String> {
    book_core::get_book_detail(uuid, bid)
}

#[tauri::command]
pub fn get_catalog(uuid: String, bid: String) -> Result<Value, String> {
    book_core::get_catalog(uuid, bid)
}

#[tauri::command]
pub fn get_chapter(uuid: String, bid: String, cid: String) -> Result<Value, String> {
    book_core::get_chapter(uuid, bid, cid)
}
