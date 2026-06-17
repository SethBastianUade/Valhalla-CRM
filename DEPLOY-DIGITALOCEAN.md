# Desplegar Valhalla CRM en DigitalOcean (Docker Compose)

Stack en un solo Droplet: **server + worker + Postgres + Redis**. Tu código
modificado se buildea localmente (no usa la imagen oficial de Twenty).

---

## 1. Crear el Droplet

- **Imagen**: Ubuntu 24.04 LTS
- **Tamaño**: mínimo **2 GB / 1 vCPU** ($12/mes) — recomendado **4 GB / 2 vCPU**
  ($24/mes) para que corra cómodo.
- ⚠️ El build del frontend pide hasta **8 GB de RAM**. En 2–4 GB **no buildea sin
  swap** → el paso 4 agrega swap. (Alternativa: buildear en un Droplet temporal de
  8 GB y luego bajar de tamaño.)
- Agregá tu **SSH key** al crear el Droplet.

Conectate:
```bash
ssh root@TU_IP_DROPLET
```

## 2. Instalar Docker + Compose

```bash
curl -fsSL https://get.docker.com | sh
docker --version && docker compose version
```

## 3. Clonar el repo

```bash
cd /opt
# Si el repo es privado, usá un token: https://<TOKEN>@github.com/SethBastianUade/Valhalla-CRM.git
git clone https://github.com/SethBastianUade/Valhalla-CRM.git valhalla
cd valhalla
```

## 4. Swap (clave para el build del frontend)

```bash
fallocate -l 8G /swapfile && chmod 600 /swapfile
mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
free -h   # verificá que aparezca el swap
```

## 5. Configurar el .env

```bash
cp .env.example .env
# Generá los secretos:
echo "APP_SECRET=$(openssl rand -base64 32)"
echo "PG_DATABASE_PASSWORD=$(openssl rand -base64 24)"
nano .env   # pegá los valores y poné SERVER_URL (http://TU_IP_DROPLET:3000 para empezar)
```

## 6. Buildear y levantar

```bash
docker compose build      # lento la 1ª vez (10–25 min según RAM/CPU)
docker compose up -d
docker compose logs -f server   # esperá "Nest application successfully started"
```

La primera vez el server corre las **migraciones de DB** automáticamente.

## 7. Probar

Abrí `http://TU_IP_DROPLET:3000` → deberías ver el login de **Valhalla**.
Creá el primer workspace con "Continue with Email".

> Si no carga: `docker compose ps` (todo `healthy`?) y `docker compose logs server`.

---

## 8. HTTPS + dominio (producción)

Apuntá un registro **A** de `crm.tudominio.com` → IP del Droplet. Luego agregá
Caddy (HTTPS automático con Let's Encrypt). Creá `docker-compose.override.yml`:

```yaml
services:
  caddy:
    image: caddy:2
    ports: ["80:80", "443:443"]
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy-data:/data
    depends_on: [server]
    restart: always
  server:
    ports: []   # dejá de exponer 3000 al exterior
volumes:
  caddy-data:
```

Y un `Caddyfile`:
```
crm.tudominio.com {
    reverse_proxy server:3000
}
```

Cambiá `SERVER_URL=https://crm.tudominio.com` en `.env`, luego:
```bash
docker compose up -d
```

## 9. Operación

```bash
docker compose ps                  # estado
docker compose logs -f server      # logs
docker compose restart server      # reiniciar
# Actualizar tras un git push:
git pull && docker compose build && docker compose up -d
# Backup de la DB:
docker compose exec db pg_dump -U postgres default > backup_$(date +%F).sql
```

## Notas
- **Firewall**: en el panel de DO, permití 22, 80, 443 (y 3000 solo si probás por IP sin Caddy).
- **ClickHouse** (analytics de IA) no está incluido — es opcional, el resto funciona sin él.
- **Email**: sin SMTP configurado, las invitaciones/reset de password se loguean pero no se envían.
