Write-Host "Building IWA-API container"
docker build -f .\Dockerfile.win -t iwa-api:latest .
