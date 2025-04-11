import os
import time
import json
import logging
import threading
from watchdog.observers import Observer
from watchdog.events import FileSystemEvent, FileSystemEventHandler
import virus_tot

# Folders to monitor
observed_folders = set([])
scanned_files = []

observed_folders.add(os.path.join(os.getcwd(), "C:\\Users\\yashc\\Documents\\Stuff\\Intrusion-detection-system\\server\\test1"))
observed_folders.add(os.path.join(os.getcwd(), "C:\\Users\\yashc\\Documents\\Stuff\\Intrusion-detection-system\\server\\test2"))

# Logging setup
logging.basicConfig(filename="IDS.log", level=logging.INFO, format="%(asctime)s - %(message)s")
logger = logging.getLogger(__name__)

class FolderScanner(FileSystemEventHandler):

  def __init__(self):
    self.scanner = virus_tot.VirusTotalScanner()

  def on_created(self, event: FileSystemEvent) -> None:
    if event.is_directory:
      self.scan_dir(event.src_path)
    else:
      logger.info(f"Created {event.src_path}")
      scanned_files.append(self.scanner.scan_file(event.src_path))

  def on_deleted(self, event: FileSystemEvent) -> None:
    logger.info(f"Deleted {event.src_path}")
    observed_folders.remove(event.src_path)

  def scan_dir(self, path: str) -> None:
    try:
      with os.scandir(path) as entries:
        for entry in entries:
          if entry.is_file():
            scanned_files.append(self.scanner.scan_file(entry.path))
          elif entry.is_dir():
            self.scan_dir(entry.path)
    except (PermissionError, FileNotFoundError) as e:
      print(f"[!] Error scanning {path}: {e}")

  def add_folder(self, path: str, observer):
    if os.path.exists(path):
      observed_folders.add(path)
      self.scan_dir(path)
      observer.schedule(self, path, recursive=True)
    else:
      print(f"[!] Path does not exist: {path}")

  def delete_folder(self, path: str):
    if path in observed_folders:
      observed_folders.remove(path)
      print(f"[-] Stopped monitoring: {path}")

    else:
      print(f"[!] Folder not being monitored: {path}")


def user_input_loop(handler: FolderScanner, observer):
  while True:
    try:
      command = input().strip()

      if command.startswith("add "):
        folder = command[4:].strip()
        handler.add_folder(folder, observer)

      elif command.startswith("remove "):
        folder = command[7:].strip()
        handler.delete_folder(folder)

      elif command == "list":
        print(".LIST."+json.dumps({"observed_folders": list(observed_folders)})+ ".END.",flush=True)

      elif command == "help":
        print("Commands:\n  add <folder>\n  remove <folder>\n  list\n  help")
      
      elif command == "scan":
        print(".SCAN_RESULTS."+json.dumps({"files": scanned_files})+".END.", flush=True)

      else:
        print("[!] Unknown command. Type 'help' for options.")

    except Exception as e:
      print(f"[!] Error in input handler: {e}")


def main():
  handler = FolderScanner()
  observer = Observer()

  for folder in observed_folders:
    if os.path.exists(folder):
      handler.scan_dir(folder)
      observer.schedule(handler, folder, recursive=True)

    else:
      print(f"[!] Folder does not exist: {folder}")

  observer.start()
  logger.info("Started Monitoring...")
  # print("[*] Monitoring started. Type 'help' for commands.", flush=True)

  # Start input thread
  threading.Thread(target=user_input_loop, args=(handler, observer), daemon=True).start()

  # Keep main thread alive
  try:
    while True:
      # print("heartbeat", flush=True)
      time.sleep(10)
  except KeyboardInterrupt:
    print("[!] KeyboardInterrupt received. Stopping...", flush=True)
  finally:
    observer.stop()
    observer.join()
    logger.info("Stopped Monitoring.")


if __name__ == "__main__":
  main()
