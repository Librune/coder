use boa_engine::{Context, JsResult};
use boa_gc::{Finalize, Trace};
use boa_runtime::{ConsoleState, Logger};
use tauri::Emitter;

#[derive(Debug, Trace, Finalize)]
pub struct TauriLogger {
    #[unsafe_ignore_trace]
    pub app: tauri::AppHandle,
}

impl Logger for TauriLogger {
    fn log(&self, msg: String, _state: &ConsoleState, _context: &mut Context) -> JsResult<()> {
        self.app.emit("log", msg).unwrap();
        Ok(())
    }

    fn info(&self, msg: String, state: &ConsoleState, context: &mut Context) -> JsResult<()> {
        self.log(msg, state, context)
    }

    fn warn(&self, msg: String, state: &ConsoleState, context: &mut Context) -> JsResult<()> {
        self.log(msg, state, context)
    }

    fn error(&self, msg: String, state: &ConsoleState, context: &mut Context) -> JsResult<()> {
        self.log(msg, state, context)
    }
}
