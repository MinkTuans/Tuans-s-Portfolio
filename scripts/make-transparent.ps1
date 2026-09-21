Add-Type -AssemblyName System.Drawing

function Convert-SilhouetteToTransparent {
    param(
        [string]$inputPath,
        [string]$outputPath,
        [int]$red = 245,
        [int]$green = 248,
        [int]$blue = 245
    )

    if (-not (Test-Path $inputPath)) {
        Write-Error "File not found: $inputPath"
        return
    }

    $src = [System.Drawing.Bitmap]::FromFile($inputPath)
    $dest = New-Object System.Drawing.Bitmap($src.Width, $src.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    for ($y = 0; $y -lt $src.Height; $y++) {
        for ($x = 0; $x -lt $src.Width; $x++) {
            $pixel = $src.GetPixel($x, $y)
            $brightness = [int]($pixel.GetBrightness() * 255)
            $alpha = 255 - $brightness
            if ($alpha -lt 20) {
                $alpha = 0
            } elseif ($alpha -gt 235) {
                $alpha = 255
            }

            if ($alpha -eq 0) {
                $color = [System.Drawing.Color]::FromArgb(0, 0, 0, 0)
            } else {
                $color = [System.Drawing.Color]::FromArgb($alpha, $red, $green, $blue)
            }

            $dest.SetPixel($x, $y, $color)
        }
    }

    $dest.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $src.Dispose()
    $dest.Dispose()
    Write-Output "Saved transparent image to: $outputPath"
}

# 1. Wolf Runner -> Pure white silhouette on 100% transparent background
Convert-SilhouetteToTransparent `
    -inputPath "H:\du_an\Tuans-s-Portfolio\public\images\forest\wolf-runner.jpg" `
    -outputPath "H:\du_an\Tuans-s-Portfolio\public\images\forest\wolf-runner-transparent-white.png" `
    -red 255 -green 255 -blue 255

# 2. Wolf Runner -> Dark Charcoal silhouette on 100% transparent background
Convert-SilhouetteToTransparent `
    -inputPath "H:\du_an\Tuans-s-Portfolio\public\images\forest\wolf-runner.jpg" `
    -outputPath "H:\du_an\Tuans-s-Portfolio\public\images\forest\wolf-runner-transparent-dark.png" `
    -red 25 -green 35 -blue 28

# 3. Eagle -> White silhouette on 100% transparent background
Convert-SilhouetteToTransparent `
    -inputPath "H:\du_an\Tuans-s-Portfolio\public\images\forest\eagle-glider.jpg" `
    -outputPath "H:\du_an\Tuans-s-Portfolio\public\images\forest\eagle-transparent-white.png" `
    -red 255 -green 255 -blue 255

# 4. Eagle -> Dark silhouette on 100% transparent background
Convert-SilhouetteToTransparent `
    -inputPath "H:\du_an\Tuans-s-Portfolio\public\images\forest\eagle-glider.jpg" `
    -outputPath "H:\du_an\Tuans-s-Portfolio\public\images\forest\eagle-transparent-dark.png" `
    -red 25 -green 35 -blue 28

Write-Output "All transparent silhouettes processed successfully!"
