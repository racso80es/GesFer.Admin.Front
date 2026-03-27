//! Observa cambios bajo ./SddIA/ (debounce) y avisa por stderr para ejecutar register.

use gesfer_skills::evolution::repo_root;
use notify::{Config, RecommendedWatcher, RecursiveMode, Watcher};
use std::path::Path;
use std::sync::mpsc::channel;
use std::thread;
use std::time::Duration;

fn main() {
    let root = repo_root();
    let sddia = root.join("SddIA");
    if !sddia.is_dir() {
        eprintln!("No existe ./SddIA en {}", root.display());
        std::process::exit(1);
    }

    let (tx, rx) = channel();
    let mut watcher = RecommendedWatcher::new(tx, Config::default()).expect("watcher");
    watcher
        .watch(Path::new(&sddia), RecursiveMode::Recursive)
        .expect("watch SddIA");

    eprintln!(
        "[sddia_evolution_watch] Observando {} (debounce ~1.5s). Ctrl+C para salir.",
        sddia.display()
    );

    loop {
        match rx.recv() {
            Ok(Ok(_event)) => {
                thread::sleep(Duration::from_millis(1500));
                while rx.try_recv().is_ok() {}
                eprintln!(
                    "[sddia_evolution_watch] Cambio detectado bajo SddIA/. Ejecute sddia_evolution_register con JSON (stdin) según SddIA/norms/sddia-evolution-sync.md."
                );
            }
            Ok(Err(e)) => eprintln!("watch error: {:?}", e),
            Err(_) => break,
        }
    }
}
