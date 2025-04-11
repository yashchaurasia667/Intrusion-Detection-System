import subprocess
import requests
import time
from scapy.all import ARP, Ether, srp

def check_proxy():
  # winhttp proxy
  res = subprocess.run(['netsh', 'winhttp', 'show', 'proxy'], capture_output=True, text=True)
  print(res.stdout)

  # env proxy
  proxy = requests.utils.get_environ_proxies("https://example.com")
  print(proxy)


def scan_arp(network="192.168.1.0/24"):
  # arp = ARP(pstd=network)
  arp = ARP(pdst=network)
  ether = Ether(dst="ff:ff:ff:ff:ff:ff")
  packet = ether / arp
  result = srp(packet, timeout=3, verbose=0)[0]

  ip_mac_map = {}
  for sent, received in result:
    ip_mac_map[received.psrc] = received.hwsrc.lower()
  return ip_mac_map


def detect_poisoning():
  print("Scanning for ARP spoofing...")
  baseline = scan_arp()
  while True:
    time.sleep(10)
    current = scan_arp()
    for ip in current:
      if ip in baseline and current[ip] != baseline[ip]:
        print(f"[!] Detected ARP spoofing: IP {ip}")
        print(f"    Baseline MAC: {baseline[ip]}, Current MAC: {current[ip]}")
    baseline = current

def resolve_doh(domain):
    url = f"https://cloudflare-dns.com/dns-query"
    headers = {'accept': 'application/dns-json'}
    params = {'name': domain, 'type': 'A'}
    try:
        response = requests.get(url, headers=headers, params=params)
        r_json = response.json()
        return [ans['data'] for ans in r_json.get("Answer", []) if ans["type"] == 1]
    except Exception as e:
        print("DoH resolution failed:", e)
        return []
