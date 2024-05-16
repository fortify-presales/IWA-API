Write-Host "Starting IWA-API container"
docker run -d --restart always -p 8088:8080 --name iwa-api iwa-api:latest
