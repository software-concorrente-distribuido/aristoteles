@echo off
setlocal enabledelayedexpansion

docker-compose up --build -d
echo Starting the Blockchain...
timeout /t 5

set "ADDRESS_1=ADDRESS_1.txt"
set "ADDRESS_2=ADDRESS_2.txt"

for /f "delims=" %%i in ('docker-compose ps -q') do (
    for /f "delims=" %%j in ('docker inspect --format "{{.Name}}" %%i ^| sed "s/^\/\(\w\+\)$/\1/" ^| cut -c2-') do (
        set "CONTAINERS=!CONTAINERS! %%j"
    )
)

set "CONTAINERS_ARRAY=%CONTAINERS%"

set "NUM_CONTAINERS=0"
for %%i in (%CONTAINERS_ARRAY%) do set /a NUM_CONTAINERS+=1
set /a MIDPOINT=NUM_CONTAINERS / 2

set "INDEX=0"
for %%i in (%CONTAINERS_ARRAY%) do (
    set "CONTAINER=%%i"

    if !INDEX! lss !MIDPOINT! (
        set "ADDRESS_FILE=%ADDRESS_1%"
    ) else (
        set "ADDRESS_FILE=%ADDRESS_2%"
    )

    for /f "delims=" %%a in ('docker exec "%CONTAINER%" type "%ADDRESS_FILE%" 2^>nul') do (
        set "ADDRESS=%%a"
    )

    docker exec "%CONTAINER%" geth attach --exec "miner.setEtherbase('%ADDRESS%')" >nul 2>&1
    if !errorlevel! equ 0 (
        echo %CONTAINER%: Successfully set etherbase to %ADDRESS%
    ) else (
        echo %CONTAINER%: Error setting miner address.
    )

    set /a INDEX+=1
)

timeout /t 5
echo Deploying the Smart Contract. This process might take a while.
node --no-deprecation deploy_contract.js
:: docker compose down --volumes --remove-orphans
