// file_json = json.dumps({
//         "file": file_obj.get("names", ["unnamed"])[0],
//         "sHA256:": file_obj.sha256,
//         "size:": file_obj.size,
//         "malicious_detections:": file_obj.last_analysis_stats["malicious"],
//         "suspicious_detections:": file_obj.last_analysis_stats["suspicious"],
//         "vt_url": f"https://www.virustotal.com/gui/file/{file_obj.sha256}",

export interface file {
  name: string;
  hash: string;
  path: string;
  size: number;
  score: number;
  total: number;
  vt_url: string;
}
