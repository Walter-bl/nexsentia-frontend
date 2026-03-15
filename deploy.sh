#!/bin/bash
set -e

# ============================================================
# Nexsentia Frontend - Hostinger VPS Deployment (PM2 + Next.js)
# Run from the VPS after cloning the frontend repo
#
# Usage: chmod +x deploy.sh && ./deploy.sh
# ============================================================

DOMAIN="nexsentia.com"
EMAIL="admin@nexsentia.com"
APP_DIR="$(pwd)"

echo "==> Deploying Nexsentia Frontend to VPS"
echo "    Domain: $DOMAIN"

# --- 1. Create .env.production ---
echo "==> Creating .env.production..."
cat > .env.production <<EOF
NEXT_PUBLIC_API_URL=https://backend.nexsentia.com/api/v1
EOF

# --- 2. Install & Build ---
echo "==> Installing dependencies..."
npm ci --quiet

echo "==> Building Next.js application..."
npm run build

# --- 3. Nginx config for frontend ---
echo "==> Configuring Nginx for frontend..."
sudo tee /etc/nginx/conf.d/nexsentia-frontend.conf > /dev/null <<'NGINX'
server {
    listen 80;
    server_name nexsentia.com www.nexsentia.com app.nexsentia.com;

    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
}
NGINX

sudo nginx -t && sudo systemctl reload nginx

# --- 4. SSL for frontend domains ---
echo "==> Obtaining SSL certificate for frontend..."
sudo certbot --nginx -d nexsentia.com -d www.nexsentia.com -d app.nexsentia.com --non-interactive --agree-tos -m "${EMAIL}" || {
  echo "    SSL failed — make sure DNS A records point to this server:"
  echo "      nexsentia.com     -> $(curl -s ifconfig.me)"
  echo "      www.nexsentia.com -> $(curl -s ifconfig.me)"
  echo "      app.nexsentia.com -> $(curl -s ifconfig.me)"
  echo "    Then run: sudo certbot --nginx -d nexsentia.com -d www.nexsentia.com -d app.nexsentia.com --non-interactive --agree-tos -m ${EMAIL}"
}

# --- 5. Start PM2 ---
echo "==> Starting frontend with PM2..."
pm2 delete nexsentia-frontend 2>/dev/null || true
pm2 start ecosystem.config.js --env production
pm2 save

echo ""
echo "============================================================"
echo "  Nexsentia Frontend deployed successfully!"
echo ""
echo "  Frontend: https://${DOMAIN}"
echo "  Backend:  https://backend.nexsentia.com/api/v1"
echo ""
echo "  Commands:"
echo "    pm2 logs nexsentia-frontend   # View logs"
echo "    pm2 reload nexsentia-frontend # Zero-downtime reload"
echo "============================================================"
