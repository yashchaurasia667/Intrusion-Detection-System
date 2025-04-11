import os
import hashlib
import vt
from dotenv import dotenv_values

class VirusTotalScanner:

  def __init__(self, env_path="../../server/.env"):
    config = dotenv_values(env_path)
    self.API_KEY = config["VIRUS_TOTAL_API_KEY"]

    if not self.API_KEY:
      raise ValueError("VIRUS_TOTAL_API_KEY not found in .env")

  def __del__(self):
    if hasattr(self, "client"):
      self.client.close()

  def get_file_hash(self, path: str) -> str:
    with open(path, "rb") as f:
      return hashlib.sha256(f.read()).hexdigest()

  def get_file_size_mb(self, path: str) -> str:
    return os.path.getsize(path) / (1024**2)

  def scan_file(self, path: str) -> None:
    try:
      file_hash = self.get_file_hash(path)

      with vt.Client(apikey=self.API_KEY) as client:
        file_obj = client.get_object(f"/files/{file_hash}")

        print("File:", file_obj.get("names", ["Unnamed"])[0])
        print("SHA256:", file_obj.sha256)
        print("Size:", file_obj.size, "bytes")
        print("Malicious detections:", file_obj.last_analysis_stats["malicious"])
        print("Suspicious detections:", file_obj.last_analysis_stats["suspicious"])
        print("VT URL:", f"https://www.virustotal.com/gui/file/{file_obj.sha256}")

    except vt.error.APIError as e:
      print(f"[!] File not found: {e}")
      self._prompt_upload(path)

    except Exception as e:
      print(f"[!] Unexpected error: {e}")

    # finally:
    #   self.client.close()

  def _prompt_upload(self, path: str):
    confirm = input(f"File not found. Upload to VirusTotal? [y/N]: ").strip().lower()
    if confirm == "y":
      with open(path, "rb") as f:
        with vt.Client(apikey=self.API_KEY) as client:
          analysis = client.scan_file(f, wait_for_completion=True)
          file_hash = analysis.meta["file_info"]["sha256"]
          file_obj = self.client.get_object(f"/files/{file_hash}")

          print()
          print(f"Uploaded and scanned: {file_obj.sha256}")
          print(f"Malicious: {file_obj.last_analysis_stats['malicious']}")
          print(f"VT Link: https://www.virustotal.com/gui/file/{file_hash}")
    else:
      print("Upload cancelled.")


if __name__ == "__main__":
  path = os.path.join("C:\\Users\\yashc\\Documents\\Stuff\\CTFs\\THM\\rootme\\payload.php.;")
  size = os.path.getsize(path) / pow(1024, 2)
  print(f"path: {path}, size: {size}")

  v = VirusTotalScanner()
  v.scan_file(path)
