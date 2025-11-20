# Ruta base del proyecto
$basePath = "E:\BuenosPasos\buenospasos\caminata13\src"

# Buscar imports rotos (líneas con 'import' pero sin 'from')
Write-Host "=== Detectando imports incompletos ==="
Get-ChildItem -Path $basePath -Recurse -Include *.ts,*.tsx,*.js,*.jsx |
    Select-String -Pattern "import" |
    Where-Object { $_.Line -notmatch "from" } |
    ForEach-Object {
        Write-Host "Archivo: $($_.Path) | Línea: $($_.LineNumber) | Contenido: $($_.Line.Trim())"
    }

# Buscar referencias a 'landing'
Write-Host "`n=== Detectando referencias a 'landing' ==="
Get-ChildItem -Path $basePath -Recurse -Include *.ts,*.tsx,*.js,*.jsx |
    Select-String -Pattern "landing" |
    ForEach-Object {
        Write-Host "Archivo: $($_.Path) | Línea: $($_.LineNumber) | Contenido: $($_.Line.Trim())"
    }
