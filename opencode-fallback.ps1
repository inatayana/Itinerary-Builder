param(
    [string]$prompt = "Lanjutkan pengerjaan task sebelumnya",
    [switch]$continue,
    [int]$timeoutSeconds = 45
)

Write-Host "`n[1/2] Memulai proses fallback OpenCode..." -ForegroundColor Yellow

# Urutan hirarki model tunggal dari yang paling canggih hingga model cadangan
$models = @(
    "tokenrouter/GLM-5.3 (free)",
    "openrouter/nvidia/nemotron-3-ultra-550b-a55b:free",
    "tokenrouter/GLM-5.3",
    "openrouter/Nemotron 3.5 Ultra (free)",
    "openrouter/Nemotron 3 nano Omni (free)",
    "openrouter/Nemotron 3.5 Content Safety (free)",
    "openrouter/Nemotron Super (free)",
    "openrouter/Nemotron 3.5 Lightning (free)",
    "opencode/Nemotron 3 Ultra Free",
    "opencode/Nemotron 3.5 Lightning Free",
    "openrouter/nvidia/nemotron-3.5-lightning:free",
    "openrouter/inclusionai/ling-3.0-flash-vl:free",
    "openrouter/inclusionai/ling-3.0-flash-sante:free",
    "openrouter/laguna/laguna-s-2.1:free",
    "opencode/Muse Spark 1.3 free",
    "openrouter/Nex-N2.5-Pro:free",
    "openrouter/cohere/north-mini-code:free",
    "openrouter/thinkingmachines/inkling-small:free",
    "opencode/MiMo V2.5 Free"
)

$executedSuccessfully = $false

Write-Host "[2/2] Mengeksekusi model (Timeout: ${timeoutSeconds}s/model)..." -ForegroundColor Yellow

for ($i = 0; $i -lt $models.Count; $i++) {
    $model = $models[$i]
    $stepNum = $i + 1
    Write-Host "`n      -> [Mencoba Model $stepNum dari$($models.Count)]:$model" -ForegroundColor Cyan

    $cliArgs = "run --model `"$model`""
    if ($continue) {$cliArgs += " --continue"
        Write-Host "      [MODE] Melanjutkan sesi sebelumnya (--continue)" -ForegroundColor Magenta
    }
    $cliArgs += " `"$prompt`""

    # Pembungkus cmd.exe /c agar Windows mengenali perintah CLI opencode
    $processInfo = New-Object System.Diagnostics.ProcessStartInfo
    $processInfo.FileName = "cmd.exe"
    $processInfo.Arguments = "/c opencode $cliArgs"
    $processInfo.UseShellExecute =$false

    try {
        $process = [System.Diagnostics.Process]::Start($processInfo)

        if ($null -ne $process) {$finished = $process.WaitForExit($timeoutSeconds * 1000)

            if (-not $finished) {
                Write-Warning "      [TIMEOUT] Model $model macet >${timeoutSeconds}s. Menghentikan proses..."
                try { $process.Kill() } catch {}
                continue
            }

            if ($process.ExitCode -eq 0) {
                Write-Host "`n[SUCCESS] Selesai dieksekusi oleh model: $model" -ForegroundColor Green
                $executedSuccessfully = $true
                break
            } else {
                Write-Warning "      [GAGAL] Exit Code: $($process.ExitCode). Beralih ke model berikutnya..."
            }
        }
    } catch {
        Write-Warning "      [ERROR] Gagal memanggil proses: $_"
    }
}

if (-not $executedSuccessfully) {
    Write-Error "`n[ERROR] Semua model fallback dalam daftar gagal dieksekusi."
}