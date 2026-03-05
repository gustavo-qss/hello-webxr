# WebXR Hello World - Offline

## Requisitos

- **Node.js** v14 ou superior — [nodejs.org](https://nodejs.org)
- **GIT BASH -> OpenSSL** (para gerar certificados) — incluso no Git for Windows: [git-scm.com](https://git-scm.com)
- **Celular Android** com Chrome e suporte a ARCore — [lista de dispositivos](https://developers.google.com/ar/devices)
- PC e celular na **mesma rede Wi-Fi**

## Como rodar

### 1. Gerar certificados SSL

**Git Bash (Windows):**
```bash
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes -subj "//CN=localhost"
```

### 2. Liberar firewall (Windows)

**PowerShell como Administrador:**
```powershell
New-NetFirewallRule -DisplayName "WebXR Server" -Direction Inbound -LocalPort 8443 -Protocol TCP -Action Allow
```

### 3. Descobrir seu IP

```bash
ipconfig
```
Anote o IPv4 (ex: `192.168.1.100`)

### 4. Iniciar servidor

```bash
node server.js
```

### 5. Acessar do celular

No Chrome do celular:
```
https://SEU_IP:8443
```

Aceite o aviso de segurança → "Avançado" → "Continuar"

Clique em **START AR** e toque na tela para adicionar cubos.

---

## Problemas comuns

**Timeout:** Execute o comando do firewall (passo 2)  
**WebXR not available:** Use HTTPS e Chrome, celular precisa estar na lista de dispositivos compatíveis no ARCore  
**Site não seguro:** É esperado, clique em "Avançado" e continue
